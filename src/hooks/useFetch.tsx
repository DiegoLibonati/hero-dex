import { useEffect, useState } from "react";
import axios from "axios";

type UseFetch<T> = {
  data: T[];
  loading: boolean;
};

export const useFetch = <T,>(url: string): UseFetch<T> => {
  const [arr, setArr] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const get = async () => {
    const resp = await axios.get(url);
    const data = await resp.data;

    setArr(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    if (!url) return setLoading(false);

    get();
  }, [url]);

  return {
    data: arr,
    loading: loading,
  };
};

// const filter = getHeroesByPublishers(publisher, data);
// dispatch({ type: types.fetch, payload: filter });
