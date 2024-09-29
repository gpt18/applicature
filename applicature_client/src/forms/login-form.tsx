import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { checkUserRegistered, loginUser, registerUser } from "../lib/services";
import { isValidEmail } from "../lib/utils";
import { X } from "lucide-react";

function LoginForm({ className }: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    username: "",
    emailAndUsername: "",
  });

  const [required, setRequired] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, otp, username } = formData;
    setLoading(true);
    setMessage("");
    let shouldReturn = false;

    try {
      if (required === "otp") {
        if (!email || !otp || !username || !password) {
          setMessage("All fields are required");
          shouldReturn = true;
        } else {
          const res = await registerUser({ email, username, password, otp });
          setMessage(
            res?.data?.message || "An error occurred. Please try again."
          );
        }
      } else if (required === "password") {
        if ((!email && !username) || !password) {
          setMessage("All fields are required");
          shouldReturn = true;
        } else {
          const res = await loginUser({ email, username, password });
          setMessage(
            res?.data?.message || "An error occurred. Please try again."
          );
        }
      } else {
        const res = await checkUserRegistered({ email, username });
        if (res?.data?.success) {
          setRequired(res?.data?.required);
        }
        setMessage(
          res?.data?.message || "An error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
      if (shouldReturn) return;
    }
  };

  const hangleChangeInput = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [id]: value };

      if (id === "emailAndUsername") {
        if (isValidEmail(value)) {
          updatedFormData.email = value;
          updatedFormData.username = "";
        } else {
          const sanitizedUsername = value.replace(/[^a-zA-Z0-9-_.]/g, "");
          updatedFormData.username = sanitizedUsername;
          updatedFormData.email = "";
        }
      }

      return updatedFormData;
    });
  };

  const handleClearMessage = () => {
    setMessage("");
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {message && (
        <div className="text-center text-red-600 mb-4 flex gap-4 items-center justify-center">
          <span>{message}</span>
          <X size={14} onClick={handleClearMessage} />
        </div>
      )}
      <div className="flex flex-col space-y-4">
        <label htmlFor="email">Email / Username</label>
        <Input
          id="emailAndUsername"
          type="text"
          className="border border-gray-300 p-2 rounded"
          onChange={hangleChangeInput}
        />

        {required === "otp" && (
          <>
            <label htmlFor="otp">OTP</label>
            <Input
              id="otp"
              type="text"
              className="border border-gray-300 p-2 rounded uppercase"
              onChange={hangleChangeInput}
            />
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              type="text"
              className="border border-gray-300 p-2 rounded"
              onChange={hangleChangeInput}
            />
          </>
        )}
        {(required === "password" || required === "otp") && (
          <>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              className="border border-gray-300 p-2 rounded"
              onChange={hangleChangeInput}
            />
          </>
        )}

        <Button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {required === "otp"
            ? "Register"
            : required === "password"
            ? "Login"
            : "Continue"}
          {}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
