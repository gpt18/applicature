import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components/basic-components";

export const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="flex flex-col h-screen max-w-[1580px] mx-auto">
        <div className="flex-1 flex min-h-0">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};
