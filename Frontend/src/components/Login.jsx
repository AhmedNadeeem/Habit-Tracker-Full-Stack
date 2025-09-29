import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventdefault();
    console.log(`Email: ${user.email}, password: ${user.password}`);
    if (user.email.length > 0 && user.password.length > 6) {
      try {
        axios
          .post("http://localhost:8000/api/v1/auth/login", user)
          .then((response) => console.log(response))
          .catch((error) => console.error(error))
          .finally(() => {
            setUser({ email: "", password: "" });
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-gray-900 p-4 py-6 rounded-lg mt-1">
      {loading && (
        <h1 className="text-white font-bold text-center mb-4">Processing...</h1>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mt-3 mb-3">
          <Label className="mb-1.5 text-white" htmlFor="email">
            Email:
          </Label>
          <Input
            type="email"
            id="email"
            className="selection:bg-[#ff9100] selection:text-black"
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

        <Button className="mt-4">Login</Button>
      </form>
    </div>
  );
};

export default Login;
