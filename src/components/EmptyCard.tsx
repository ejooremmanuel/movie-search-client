import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

type Props = {
  title?: string;
  message?: string;
};

export const EmptyStateCard: FC<Props> = ({
  title = "No movies found",
  message = "Try using another search to display more results",
}) => {
  return (
    <Box
      position="relative"
      sx={{
        background: "#F7F7F8",
        width: "60%",
        height: "350px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        margin: "auto",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="63"
        viewBox="0 0 64 63"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M53 43.5V13.5C53 11.9087 52.3679 10.3826 51.2426 9.25736C50.1174 8.13214 48.5913 7.5 47 7.5H23C21.4087 7.5 19.8826 8.13214 18.7574 9.25736C17.6321 10.3826 17 11.9087 17 13.5V43.5C17 45.0913 17.6321 46.6174 18.7574 47.7426C19.8826 48.8679 21.4087 49.5 23 49.5H47C48.5913 49.5 50.1174 48.8679 51.2426 47.7426C52.3679 46.6174 53 45.0913 53 43.5Z"
          stroke="#A1A6A9"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.4146 14.8066L10.4026 16.9966C8.90778 17.5411 7.69037 18.657 7.01809 20.0989C6.34581 21.5407 6.2737 23.1906 6.81761 24.6856L17.0776 52.8766C17.3472 53.6172 17.76 54.2973 18.2925 54.8783C18.825 55.4592 19.4667 55.9296 20.181 56.2625C20.8953 56.5954 21.6682 56.7844 22.4555 56.8185C23.2428 56.8527 24.0292 56.7314 24.7696 56.4616L41.4736 49.8676M25.9996 22.5016H40.9996M25.9996 28.5016H43.9996M25.9996 34.5016H34.9996"
          stroke="#A1A6A9"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <Box textAlign={"center"}>
        <Typography
          className="mb-2"
          variant="h2"
          color="rgba(38, 50, 56, 0.70)"
          fontSize="20px"
          fontWeight={600}
        >
          {title}
        </Typography>
        <Typography
          color="rgba(38, 50, 56, 0.70)"
          fontSize="16px"
          textAlign={"center"}
          maxWidth={"276px"}
          lineHeight={"140%"}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyStateCard;
