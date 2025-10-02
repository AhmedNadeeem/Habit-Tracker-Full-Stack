import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../components/Login";
import Register from "../components/Resgister";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function Auth() {
  const {type} = useParams();

  return (
    <div className="w-full h-screen flex justify-center pt-20 bg-black">
      <Tabs defaultValue={type} className="w-[400px]">

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

export default Auth;
