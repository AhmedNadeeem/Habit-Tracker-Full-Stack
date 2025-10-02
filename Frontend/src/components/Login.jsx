import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from '../store/slices/user.slice';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginUser = () => {
    try {
      if (user.email.length > 0 && user.password.length >= 5) {
        setLoading(true);
        axios
          .post("http://localhost:8000/api/v1/auth/login", user, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            const accessToken = response.data?.accessToken || "";
            const refreshToken = response.data?.refreshToken || "";
            const data = response.data?.user || "";
            const user = {
              userId: data?.id,
              username: data?.username, 
              email: data?.email,
            };
            
            const payload = { user, accessToken, refreshToken }
            dispatch(login(payload))
            
            toast.success("User logged In! Redirecting!");
            setTimeout(()=> navigate("/"), 1000);
            
          }) 
          .catch((error) => {
            const errorMsg = (error.response?.data?.message)
            console.error(errorMsg);
            toast.error(errorMsg);
          })
          .finally(() => {
            setUser({ email: "", password: "" });
            setLoading(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-900 p-4 py-6 rounded-lg mt-1">
      <Toaster/>
      {loading && (
        <h1 className="text-white font-bold text-center mb-4">Processing...</h1>
      )}

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

      <Button onClick={loginUser} className="mt-4">
        Login
      </Button>
    </div>
  );
};

export default Login;
