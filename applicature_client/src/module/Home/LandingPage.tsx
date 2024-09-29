import { DrawerDialog } from "../../components/drawer-dialog";
import LoginForm from "../../forms/login-form";

export const LandingPage = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <DrawerDialog
          Trigger={
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Login
            </button>
          }
          Content={
            <div className="bg-white p-6 md:p-0 rounded-md">
              <h1 className="text-xl font-bold text-center">Login</h1>
              <div className="py-2">
                <LoginForm />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};
