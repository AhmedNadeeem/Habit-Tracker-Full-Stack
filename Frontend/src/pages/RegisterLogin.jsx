import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../components/Login";
import Register from "../components/Resgister";

function RegisterLogin() {
  return (
    <div className="w-full h-screen flex justify-center pt-20 bg-black">
      <Tabs defaultValue="account" className="w-[400px]">

        <TabsList>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <Register />
        </TabsContent>

        <TabsContent value="login">
          <Login />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default RegisterLogin;
