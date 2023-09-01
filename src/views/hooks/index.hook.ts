import { useQuery } from "@tanstack/react-query";
import {
  ISupportedSearchOption,
  SearchResultOfMovieResponse,
} from "../types/index.types";
import { axiosInstance } from "../../utils/request";
import { useState } from "react";

export const useGetMovies = (searchOptions?: ISupportedSearchOption) => {
  const [movies, setMovies] = useState<SearchResultOfMovieResponse>(
    new SearchResultOfMovieResponse()
  );
  const [loading,setLoading]=useState(false)
  const { isLoading } = useQuery<SearchResultOfMovieResponse>({
    //   keepPreviousData: true,
    queryKey: ["movies", searchOptions],
    enabled: !!searchOptions,
    queryFn: async () => {
      const res = await axiosInstance.get<SearchResultOfMovieResponse>(
        `/?q=${searchOptions?.q}`
      );

      return res.data;
    },
    onSuccess(data) {
      if (data.Response === "False") {
        return new SearchResultOfMovieResponse();
      } else {
        setMovies(data);
      }
    },
  });

  const search = async (
    searchOptions?: ISupportedSearchOption
  ): Promise<void> => {
    setLoading(true)
    const res = await axiosInstance.get<SearchResultOfMovieResponse>(
      `/?q=${searchOptions?.q}`
    );
    if (res.data.Response === "False") {
      setMovies(new SearchResultOfMovieResponse());
    }
    setMovies(res.data);
    setLoading(false)
  };

  return { data: movies, isLoading, search,loading };
};
export const useGetMovie = (id: string) => {
  // const {} =
};
