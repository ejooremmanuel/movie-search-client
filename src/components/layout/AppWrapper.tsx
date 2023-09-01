import { Box } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

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

  console.log(scroll, "scroll");

  return (
    <Box width="100%" className="flex flex-col gap-3">
      <Box
        height="100px"
        className={`flex items-center transition fixed top-0 bg-[#18171f] z-30 w-full`}
      >
        <Box className="text-white px-[60px]">Movie search</Box>
      </Box>
      <Box className="px-[60px] w-full mt-[100px]">{children}</Box>
    </Box>
  );
};
