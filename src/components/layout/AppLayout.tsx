import React from "react";
import { Outlet } from "react-router-dom";
import { AppWrapper } from "./AppWrapper";

const AppLayout = () => {
  return (
    <AppWrapper>
      <Outlet />
    </AppWrapper>
  );
};

export default AppLayout;
