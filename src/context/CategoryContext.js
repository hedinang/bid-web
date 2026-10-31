import React, {createContext, useContext, useEffect, useMemo, useState,} from "react";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import apiFactory from "../api";

const CategoryContext = createContext(null);

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({children}) => {
  const {category} = useParams();

  const [itemList, setItemList] = useState([]);
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState({
    limit: 24,
    page: 1,
    totalItems: 0,
    searchBranch: "",
    searchDate: "",
    searchRank: "",
    searchCategory: category,
  });

  const [item, setItem] = useState({});
  const [activeUrl, setActiveUrl] = useState({});


  const {itemId} = useParams();

  const setFullActiveUrl = (url) => {
    setActiveUrl(
        url?.replace("https://resize.ecoauc.com", "https://assets.ecoauc.com")
    );
  };

  const fetchDates = async () => {
    const result = await apiFactory.bidApi.getDates();

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setDates(result?.data?.map(date => {
      return {value: date, label: date};
    }));
  };

  const fetchItemDetail = async () => {
    setIsLoading(true);
    if (!itemId) return;

    const result = await apiFactory.itemApi.getDetail(itemId);

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);
    setItem(result?.data);
    setFullActiveUrl(result?.data?.detailUrls?.[0]);
  };

  const fetchItemList = async () => {
    setIsLoading(true);
    if (!category) return;

    const result = await apiFactory.itemApi.list(searchItem);

    if (result?.status !== 200) {
      toast.error("can not load bid list");
      return;
    }
    setIsLoading(false);
    setItemList(result?.data?.items);
    setSearchItem(prev => {
      return {...prev, totalItems: result?.data?.totalItems}
    })
  };

  const onChooseDate = (e) => {
    setSearchItem({
      ...searchItem,
      limit: 50,
      page: 1,
      searchDate: e,
    });
  };

  const onChooseBranch = (e) => {
    setSearchItem({
      ...searchItem,
      limit: 50,
      page: 1,
      searchBranch: e,
    });
  };

  const onChooseRank = (e) => {
    setSearchItem({
      ...searchItem,
      limit: 50,
      page: 1,
      searchRank: e,
    });
  };

  const onChooseCategory = (e) => {
    setSearchItem({
      ...searchItem,
      page: 1,
      searchCategory: e,
    });
  };

  const changePage = (e) => {
    setSearchItem({
      ...searchItem,
      page: e,
    });
  };

  useEffect(() => {
    fetchItemList();
  }, [searchItem?.limit, searchItem?.page, searchItem?.searchBranch, searchItem?.searchDate, searchItem?.searchRank, searchItem?.searchCategory]);

  useEffect(() => {
    fetchItemDetail();
  }, [itemId]);

  useEffect(() => {
    fetchDates()
  }, [])

  const values = useMemo(
      () => ({
        category,
        itemList,
        item,
        activeUrl,
        setActiveUrl,
        setFullActiveUrl,
        onChooseBranch,
        onChooseDate,
        onChooseRank,
        onChooseCategory,
        changePage,
        isLoading,
        searchItem,
        setItemList,
        setItem,
        dates
      }),
      [category, itemList, isLoading, searchItem, item, activeUrl, dates]
  );

  return <CategoryContext.Provider value={values}>{children}</CategoryContext.Provider>;
};
