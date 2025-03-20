import React, { type PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <div className="container mx-auto my-6 max-w-6xl">{children}</div>;
};

export default DashboardLayout;
