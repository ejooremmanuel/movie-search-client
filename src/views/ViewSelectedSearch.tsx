import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovie } from "./hooks/index.hook";
import { Button, CircularProgress, Rating } from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CardLabel } from "../components";

const ViewSelectedMovie = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovie(id || "");

  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;

  return (
    <div className="w-full">
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
            className="object-cover w-full h-full"
          />
        </div>
        <div className="grid-cols-2">
          <div className="text-[20px] w-full text-white">{data?.Title}</div>
          <div className="text-[14px] w-full text-gray-700">{data?.Plot}</div>
          <div className="text-[16px] w-full text-white flex  gap-2">
            <div>Starring:</div>
            <div>{data?.Actors}</div>
          </div>

          <div className="flex gap-2 items-end w-full">
            <div className="text-white font-bold">Type:</div>
            <div className="text-[14px] w-full text-gray-700">{data?.Type}</div>
          </div>
          <CardLabel content={data?.Country || ""} title="Country" />
          <CardLabel content={data?.Language || ""} title="Language" />
          <CardLabel content={data?.Awards || ""} title="Awards" />

          <div className="flex gap-2 items-end w-full">
            <div className="text-white font-bold">Date realeased:</div>
            <div className="text-[14px] w-full text-gray-700">
              {data?.Released}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-white font-bold">Rating:</div>
            <Rating value={Number(data?.imdbRating)} max={10} readOnly />
          </div>
          <CardLabel content={data?.imdbVotes || ""} title="Votes" />
        </div>
      </div>
    </div>
  );
};

export default ViewSelectedMovie;
