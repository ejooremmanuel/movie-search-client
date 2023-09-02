import { Box } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [scroll, setScroll] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", (e) => {});
    };
  });

  return (
    <Box width="100%" className="flex flex-col gap-3">
      <Box
        height="100px"
        className={`flex items-center transition fixed top-0 bg-[#18171f] z-30 w-full`}
      >
        <Link to="/">
          <Box className="text-white px-[60px] cursor-pointer">
            Movie search
          </Box>
        </Link>
      </Box>
      <Box className="px-[60px] w-full mt-[100px]">{children}</Box>
    </Box>
  );
};
