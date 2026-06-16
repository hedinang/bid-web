import {MdArrowBackIos} from "react-icons/md";
import {IoClose} from "react-icons/io5";

const AutoItemPanel = ({closePanel}) => {

  // const resourceViewer = useResourceViewer();
  return (<div className="w-[350px] bg-white border-[1px] flex flex-col">
    {/* Header */}
    <div className="relative p-3 border-b flex justify-center items-center h-[70px]">
       <span className="absolute left-1/2 -translate-x-1/2 font-semibold text-[18px]">
          Lịch sử file
        </span>
      <button
          size="small"
          onClick={closePanel}
          className="absolute right-3 cursor-pointer p-2"
      >
        <IoClose size={25} color="#2a56b9"/>
      </button>
    </div>
    <div className="h-screen overflow-y-auto">
      ddsds
    </div>
  </div>);
};

export {AutoItemPanel};
