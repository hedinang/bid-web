import apiFactory from "./index";

const CHUNK_SIZE = 10 * 1024 * 1024;
const CONCURRENCY = 3;
export const uploadMultipartFile = async ({
                                            file,
                                            bucket,
                                            onProgress,
                                            signal,
                                          }) => {
  if (!file) {
    throw new Error("File không tồn tại");
  }

  let uploadId;
  let objectKey;

  try {
    const initResponse = await apiFactory.resourceApi.createMultipart({
      fileName: file.name,
      fileSize: file.size,
      bucket,
      contentType: file.type || "application/octet-stream",
    });

    uploadId = initResponse.data.uploadId;
    objectKey = initResponse.data.objectKey;

    const chunks = createChunks(file);

    const loadedByPart = new Map();

    const completedParts = [];

    await runWithConcurrency({
      items: chunks,
      concurrency: CONCURRENCY,

      worker: async (chunk) => {
        const partPresignedResponse =
            await apiFactory.resourceApi.createPartUrl({
              uploadId: uploadId,
              objectKey: objectKey,
              partNumber: chunk?.partNumber,
              bucket
            });

        const uploadedResponse = await apiFactory.resourceApi.uploadFile(
            partPresignedResponse?.data?.uploadUrl,
            chunk.blob,
            {
              signal,
              onUploadProgress: ({loaded, rate, estimated}) => {
                loadedByPart.set(chunk.partNumber, Math.min(loaded, chunk.size));

                const totalLoaded = Array.from(loadedByPart.values()).reduce(
                    (sum, value) => sum + value,
                    0,
                );

                const percent = Math.min(
                    100,
                    Math.round((totalLoaded * 100) / file.size),
                );

                onProgress?.({
                  percent,
                  loaded: totalLoaded,
                  total: file.size,
                  rate,
                  estimated,
                  partNumber: chunk.partNumber,
                  totalParts: chunks.length,
                });
              },
            },
        );

        const etag = normalizeEtag(uploadedResponse.headers.etag);

        completedParts.push({
          partNumber: chunk.partNumber,
          etag,
        });

        // Đảm bảo progress part hoàn thành bằng đúng size.
        loadedByPart.set(chunk.partNumber, chunk.size);
      },
    });

    completedParts.sort((a, b) => a.partNumber - b.partNumber);

    // 4. Complete multipart upload.
    const completeResponse = await apiFactory.resourceApi.complete({
      uploadId,
      objectKey: objectKey,
      parts: completedParts,
      bucket
    });

    // return {
    //   location: result?.data?.url,
    //   ...result,
    // };

    onProgress?.({
      percent: 100,
      loaded: file.size,
      total: file.size,
    });

    return completeResponse.data;
  } catch (error) {
    if (uploadId && objectKey) {
      const result = await apiFactory.resourceApi.abort({
        uploadId,
        objectKey,
        bucket
      });
    }
  }
};

const createChunks = (file) => {
  const chunks = [];

  let partNumber = 1;

  for (let start = 0; start < file.size; start += CHUNK_SIZE) {
    const end = Math.min(start + CHUNK_SIZE, file.size);

    chunks.push({
      partNumber,
      blob: file.slice(start, end),
      size: end - start,
    });

    partNumber += 1;
  }

  return chunks;
};

const runWithConcurrency = async ({items, concurrency, worker}) => {
  let currentIndex = 0;

  const runners = Array.from(
      {
        length: Math.min(concurrency, items.length),
      },
      async () => {
        while (true) {
          const index = currentIndex;
          currentIndex += 1;

          if (index >= items.length) {
            return;
          }

          await worker(items[index], index);
        }
      },
  );

  await Promise.all(runners);
};

const normalizeEtag = (etag) => {
  if (!etag) {
    throw new Error("Không đọc được ETag. Hãy kiểm tra CORS ExposeHeaders.");
  }

  return etag.replaceAll('"', "");
};