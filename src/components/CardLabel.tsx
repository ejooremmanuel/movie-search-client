import React from "react";
import { MovieDetails } from "../views/types/index.types";

type Props = {
  title: string;
  content: string;
};

const CardLabel = (props: Props) => {
  const { title, content } = props;
  return (
    <div className="flex gap-2 items-end w-full">
      <div className="text-white font-bold">{title}:</div>
      <div className="text-[14px] w-full text-white">{content}</div>
    </div>
  );
};

export default CardLabel;
