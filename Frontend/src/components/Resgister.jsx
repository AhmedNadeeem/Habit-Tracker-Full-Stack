import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "react-hot-toast";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const registerUser = () => {
    try {
      if (
        user.username.length > 0 &&
        user.email.length > 0 &&
        user.password.length >= 5
      ) {
        setLoading(true);
        axios
          .post("http://localhost:8000/api/v1/auth/register", user, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            const toastData = response.data.message;
            toast.success(toastData);
          })
          .catch((error) => {
            console.log("error: ", error.message);
            toast.error(error.message);
          })
          .finally(() => {
            setUser({ email: "", password: "" });
            setLoading(false);
          });
      } else {
        console.log("Bad creds");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-4 py-6 rounded-lg mt-1">
      <Toaster />

      {loading && (
        <h1 className="text-white font-bold text-center mb-4">Processing...</h1>
      )}

      <div>
        <Label className="mb-1.5 text-white" htmlFor="username">
          Username:
        </Label>
        <Input
          className="selection:bg-[#ff9100] selection:text-black"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          name="username"
        />
      </div>

      <div className="mt-3 mb-3">
        <Label className="mb-1.5 text-white" htmlFor="email">
          Email:
        </Label>
        <Input
          className="selection:bg-[#ff9100] selection:text-black"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          name="email"
        />
      </div>

      <div>
        <Label className="mb-1.5 text-white" htmlFor="password">
          Password:
        </Label>
        <Input
          className="selection:bg-[#ff9100] selection:text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          name="password"
        />
      </div>

      <Button onClick={registerUser} className="mt-4">
        Register
      </Button>
    </div>
  );
}
