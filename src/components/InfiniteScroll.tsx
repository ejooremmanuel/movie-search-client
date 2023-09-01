import { Box, CircularProgress } from "@mui/material";
import { ReactNode, useEffect, useRef } from "react";

export const InfiniteScroll: React.FC<{
  hasMore: boolean;
  loadMore: () => void;
  loadingMore: boolean;
  children: ReactNode;
}> = ({ children, hasMore, loadMore, loadingMore }) => {
  const loadingRef = useRef();

  useEffect(() => {
    if (!loadingRef.current) return;
    var options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      if (!entities[0].isIntersecting) return;
      if (loadingMore) return;
      loadMore();
    }, options);
    observer.observe(loadingRef.current);
    return () => {
      observer.disconnect();
    };
  }, [loadingRef.current, hasMore, loadingMore]);

  return (
    <>
      {children}
      {(hasMore || loadingMore) && (
        <Box
          display="flex"
          justifyContent="center"
          marginTop={1}
          ref={loadingRef}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
