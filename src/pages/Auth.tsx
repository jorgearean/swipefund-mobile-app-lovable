
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          <span className="inline-block">SF</span>
        </h1>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? "Log in to your SwipeFund account" 
              : "Join SwipeFund to connect with investors"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <Login onToggle={() => setIsLogin(false)} />
          ) : (
            <Signup onToggle={() => setIsLogin(true)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
