import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useGetMovie } from "./hooks/index.hook";
import { Button, CircularProgress, Rating } from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CardLabel, MovieCard } from "../components";
import { axiosInstance } from "../utils/request";
import {
  MovieResponse,
  SearchResultOfMovieResponse,
} from "./types/index.types";
import { Carousel } from "react-responsive-carousel";

const ViewSelectedMovie = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovie(id || "");

  const navigate = useNavigate();

  if (isLoading) return <CircularProgress color="secondary" />;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="mb-3">
        <Button startIcon={<FaArrowLeftLong />} onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-[20px] w-full">
        <div className="grid-cols-1">
          <img
            src={`${data?.Poster}`}
            alt=""
            className="object-cover w-[100%]"
          />
        </div>
        <div className="grid-cols-2">
          <div className="text-[20px] w-full text-white">{data?.Title}</div>
          <div className="text-[16px] w-full text-white">{data?.Plot}</div>
          <div className="text-[16px] w-full text-white flex  gap-2">
            <div>Starring:</div>
            <div>{data?.Actors}</div>
          </div>

          <div className="flex gap-2 items-end w-full">
            <div className="text-white font-bold">Type:</div>
            <div className="text-[14px] w-full text-white">{data?.Type}</div>
          </div>
          <CardLabel content={data?.Country || ""} title="Country" />
          <CardLabel content={data?.Language || ""} title="Language" />
          <CardLabel content={data?.Awards || ""} title="Awards" />
          <CardLabel content={data?.Metascore || ""} title="Score" />

          <div className="flex gap-2 items-end w-full">
            <div className="text-white font-bold">Date realeased:</div>
            <div className="text-[14px] w-full text-white">
              {data?.Released}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-white font-bold">Rating:</div>
            <Rating
              value={Number(data?.imdbRating)}
              max={10}
              readOnly
              color="primary"
            />
          </div>
          <CardLabel content={data?.imdbVotes || ""} title="Votes" />
        </div>
      </div>
      <div className="h-[300px] w-full mt-8">
        <div className="text-white text-[24px] mb-2">Similar movies</div>
        <SimilarMovies />
      </div>
    </div>
  );
};

export default ViewSelectedMovie;

const SimilarMovies = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [data, setData] = useState<MovieResponse[]>([]);
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get<SearchResultOfMovieResponse>(
        `/movies/find?q=${searchParams.get("year")}`
      );
      if (res.data.Response === "True") {
        setData(res.data.Search.filter((it) => it.imdbID !== id));
      }
    })();
  }, [searchParams, id]);
  return (
    <Carousel className="object-contain !h-[400px]">
      {data.map((it) => (
        <MovieCard movie={it} className="!h-[500px]" />
      ))}
    </Carousel>
  );
};
