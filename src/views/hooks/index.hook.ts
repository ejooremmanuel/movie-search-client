import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ISupportedSearchOption,
  MovieDetails,
  SearchResultOfMovieResponse,
} from "../types/index.types";
import { axiosInstance } from "../../utils/request";
import { useState } from "react";

export const useGetMovies = (searchOptions?: ISupportedSearchOption) => {
  const [movies, setMovies] = useState<SearchResultOfMovieResponse>(
    new SearchResultOfMovieResponse()
  );
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { isLoading, data } = useQuery<SearchResultOfMovieResponse>({
    queryKey: ["movies"],
    queryFn: async () => {
      setLoading(true);
      const res = await axiosInstance.get<SearchResultOfMovieResponse>(
        `movies/find?q=2023`
      );
      setLoading(false);
      return res.data;
    },
    onSuccess(data) {
      queryClient.invalidateQueries(["searches"]);
      if (data.Response === "False") {
        setMovies(new SearchResultOfMovieResponse());
      } else {
        setMovies(data);
      }
    },
  });

  const search = async (
    searchOptions?: ISupportedSearchOption
  ): Promise<void> => {
    setLoading(true);
    const res = await axiosInstance.get<SearchResultOfMovieResponse>(
      `movies/find?q=${searchOptions?.q}`
    );
    if (res.data.Response === "False") {
      setMovies(new SearchResultOfMovieResponse());
    }
    setMovies(res.data);
    setLoading(false);
  };

  return { data, movies, isLoading, search, loading };
};
export const useGetMovie = (id: string) => {
  const { isLoading, data } = useQuery<MovieDetails>({
    queryKey: ["movies-single", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosInstance.get<MovieDetails>(`movies/${id}`);

      return res.data;
    },
  });

  return { isLoading, data };
};
export const useGetRecentSearches = () => {
  const { isLoading, data = [] } = useQuery<any>({
    queryKey: ["searches"],
    queryFn: async () => {
      const res = await axiosInstance.get<any>(`searches`);

      return res.data;
    },
  });

  return { isLoading, data };
};
