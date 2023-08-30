import React from "react";
import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <DesktopSideBar />
      <MobileFooter />
      <main className="lg-pl-20 h-full">{children}</main>
    </div>
  );
};

export default SideBar;
