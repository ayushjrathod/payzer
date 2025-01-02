"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user) {
        router.push("/");
      }
    };
    fetchSession();
  }, [router]);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      setErrorMsg("Missing Username or Password");
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      phone: username,
      password,
    });

    if (result?.error) {
      setErrorMsg(result.error);
    } else {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col lg:flex-row items-center justify-between">
      <div className="hidden lg:block w-1/5 h-screen bg-black" />
      <div className="hidden lg:block w-2/5 h-screen skew-x-12 bg-black absolute" />
      <div className="m-10 lg:absolute select-none">
        <h1 className="text-white text-3xl font-semibold font-['Kanit'] tracking-[2.80px] whitespace-nowrap">
          welcome to payzer.
          <div className="mt-2 h-2 bg-neutral-50 rounded-full" />
        </h1>
        <h2 className="text-white text-2xl font-normal font-['Kanit'] leading-[44px] tracking-widest">
          Sign in to continue
        </h2>
      </div>
      <div className="pb-64 lg:pb-0 pt-2 w-auto h-auto mx-28">
        <Card className="max-w-[400px]">
          <CardHeader className="flex flex-col gap-1 items-start">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-sm text-default-500">Enter your credentials to access your account</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errorMsg && <div className="text-red-500 text-sm bg-red-100 p-2 rounded">{errorMsg}</div>}
              <Input
                isRequired
                type="text"
                label="Username"
                variant="underlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                isRequired
                type={showPass ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="underlined"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <EyeOff className="w-4 h-4 text-default-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-default-400" />
                    )}
                  </button>
                }
              />
              <div className="flex justify-between items-center">
                <Link href="/forgot-password" className="text-sm text-primary">
                  Forgot password?
                </Link>
              </div>
              <Button color="primary" type="submit" isLoading={isLoading} className="w-full">
                Sign in
              </Button>
            </form>
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col gap-2">
            <p className="text-center text-sm text-default-500">Or sign in with</p>
            <div className="flex gap-2 justify-center">
              <Button variant="flat" className="flex-1">
                Google
              </Button>
              <Button variant="flat" className="flex-1">
                Facebook
              </Button>
            </div>
            <p className="text-center text-sm text-default-500 mt-2">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
