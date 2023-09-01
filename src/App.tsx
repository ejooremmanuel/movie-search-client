import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Search from "./views/Search";
import { AppLayout } from "./components";
import ViewSelectedMovie from "./views/ViewSelectedSearch";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retryOnMount: false,
        suspense: true,
        staleTime: 600000,
      },
    },
  });
  return (
    <Suspense
      fallback={
        <Box>
          <Box>
            <CircularProgress />
          </Box>
        </Box>
      }
    >
      <QueryClientProvider client={client}>
        <Box className="w-[100vw] overflow-x-hidden h-[100vh] bg-[#18171f]">
          <Router>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route path="" element={<Search />} />
                <Route path=":id" element={<ViewSelectedMovie />} />
              </Route>
            </Routes>
          </Router>
        </Box>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
