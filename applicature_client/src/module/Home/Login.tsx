import LoginForm from "../../forms/login-form";

export const Login = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md p-8 shadow-md rounded-lg border">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
