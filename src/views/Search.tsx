import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Skeleton,
  TextField,
  colors,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useGetMovies, useGetRecentSearches } from "./hooks/index.hook";
import { EmptyCard, MovieCard } from "../components";

type Props = {};

const Search = (props: Props) => {
  const [query, setQuery] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);

  const [page] = useState(1);

  const [useSearchResult, setUseSearchResult] = useState(true);

  const { data, isLoading, movies, search, loading } = useGetMovies();

  const { data: recentQueries } = useGetRecentSearches();

  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    setSearches(recentQueries.map((it: any) => it?.query));
  }, [recentQueries]);

  const recentSearches = useMemo(() => {
    const data = searches;

    if (query) {
      return data.filter((it) =>
        it.toLowerCase().includes(query.toLowerCase())
      );
    }

    return data;
  }, [query, searches]);

  return (
    <Box className="container h-full">
      <Box
        mx="auto"
        className="lg:w-[65%] flex gap-2"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!query.trim()) return;
          setUseSearchResult(false);
          search({
            q: query,
            page,
          });
          setSearches([...Array.from(new Set([query, ...searches]))]);
        }}
      >
        <Box className="w-full relative">
          <ClickAwayListener
            onClickAway={() => {
              setOpen(false);
            }}
          >
            <TextField
              fullWidth
              type="search"
              value={query}
              onClick={() => setOpen(true)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Titles, year"
              sx={{
                border: "1px solid #fff",
                color: "#fff",
                borderRadius: "5px",
                backgroundColor: "inherit",
                fontSize: "20px",

                "& .css-1g24dm6-MuiInputBase-input-MuiOutlinedInput-input": {
                  color: "#fff",
                  fontSize: "20px",
                  backgroundColor: "inherit",
                },
              }}
            />
          </ClickAwayListener>
          <Box
            display={open ? "flex" : "none"}
            sx={{
              // background: colors.grey[400],
              width: "100%",
              minHeight: "200px",
            }}
            position="absolute"
            zIndex={99}
            p={1.5}
            className="transition-all shadow-md rounded-md flex flex-col bg-[#100f13]"
          >
            <div className="text-sm text-gray-700 ">
              Related to recent searches
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {recentSearches.map((it, index) => (
                <div
                  key={index}
                  className="cursor-pointer text-white text-[16px]"
                  onClick={() => {
                    setUseSearchResult(false);
                    search({
                      q: it,
                      page,
                    });
                  }}
                >
                  {it}
                </div>
              ))}
            </div>
          </Box>
        </Box>
        <Button
          sx={{ textTransform: "none" }}
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
          endIcon={loading && <CircularProgress size={20} />}
        >
          Search
        </Button>
      </Box>
      <Box className="mt-[30px] w-full mx-auto my-auto">
        <Box className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
          {(isLoading || loading) &&
            ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*"].map(
              (it, index) => (
                <Skeleton key={index} height="300px" color="primary"></Skeleton>
              )
            )}
          {(!isLoading || !loading) &&
            data?.Search?.length &&
            useSearchResult &&
            data?.Search?.map((movie, index) => (
              <MovieCard key={movie?.imdbID} movie={movie} />
            ))}
          {(!isLoading || !loading) &&
            movies?.Search?.length &&
            !useSearchResult &&
            movies?.Search?.map((movie, index) => (
              <MovieCard key={movie?.imdbID} movie={movie} />
            ))}
        </Box>
        {(!loading || !isLoading) &&
          !data?.Search?.length &&
          (!loading || !isLoading) && <EmptyCard />}
      </Box>
    </Box>
  );
};

export default Search;
