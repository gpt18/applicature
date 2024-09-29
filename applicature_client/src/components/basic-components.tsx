import brandLogo from "@/assets/brand-logo.svg";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex px-5 py-2 md:px-10 md:py-4 border-b items-center justify-between">
      <h1
        className="text-lg font-bold flex gap-2 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={brandLogo} alt="" className="h-8" />
        <span>Applicature</span>
      </h1>
      <div className="flex items-center gap-1 md:gap-3"></div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="flex items-center justify-center p-2 text-center">
      <p className="text-sm text-gray-500">
        © 2021 Applicature. All rights reserved.
      </p>
    </div>
  );
};
