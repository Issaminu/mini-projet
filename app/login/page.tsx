"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { userState } from "../../store/atoms";
import { useRecoilState } from "recoil";
import LoadingBar from "react-top-loading-bar";
import logo from "../../public/enset-logo.webp";

const error = "Wrong email or password";

export default function Login() {
  const router = useRouter();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const [areInfoValid, setAreInfoValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { data: session, status } = useSession();
  const ref = useRef(null);
  useEffect(() => {
    setAreInfoValid(true);
    if (session) {
      setUser(session.user);
      if (user.role) router.push("/" + user.role.toLowerCase());
      else router.push("/admin/hotels");
    }
  }, [session]);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      ref.current.staticStart();
      await signIn("credentials", {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
        callbackUrl: `${window.location.origin}`,
      }).then(async (res) => {
        ref.current.complete();
        if (!res.ok) {
          setAreInfoValid(false);
          setIsLoading(false);
        }
      });
    },
    [email, password]
  );
  if (status == "loading") return null;
  if (!session) {
    return (
      <>
        <div
          className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8"
          style={{
            background: "url('/login-bg.webp') no-repeat center center fixed",
            backgroundSize: "cover",
            minHeight: "100vh",
          }}
        >
          <div className="mt-8 sm:mx-auto sm:w-96 sm:max-w-md">
            <div className="px-4 pb-6 bg-white shadow pt-14 sm:rounded-2xl sm:px-12">
              <LoadingBar height={3} color="#06b6d4" ref={ref} />
              <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                  <Image
                    className="w-auto h-10 mx-auto"
                    src={logo}
                    alt="ENSET's logo"
                    loading="eager"
                    priority={true}
                  />
                </div>
                <h2
                  className="mt-6 text-3xl font-semibold text-center "
                  style={{ color: "#1e212a" }}
                >
                  Welcome!
                </h2>
                <p className="mt-2 text-sm text-center text-gray-900">
                  Please sign in to your account
                </p>
              </div>
              <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  {areInfoValid ? (
                    <div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            ref={email}
                            autoComplete="email"
                            required
                            autoFocus
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            ref={password}
                            autoComplete="password"
                            required
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            ref={email}
                            autoComplete="email"
                            required
                            className="block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            aria-invalid="true"
                            aria-describedby="email-error"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            ref={password}
                            autoComplete="password"
                            required
                            className="block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            aria-invalid="true"
                            aria-describedby="password-error"
                          />
                        </div>
                        <div className="flex flex-row">
                          <ExclamationCircleIcon
                            className="w-4 h-4 mt-2 mr-2 text-red-500"
                            aria-hidden="true"
                          />
                          <p
                            className="mt-2 text-xs text-red-600"
                            id="password-error"
                          >
                            {error}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded text-cyan-600 focus:ring-cyan-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block ml-2 text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:text-cyan-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg shadow-sm h-11 bg-cyan-700 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center h-full">Sign in</div>
                    </button>
                  </div>
                  <div className="text-sm">
                    Don&apos;t have an account? &nbsp;
                    <Link href="/signup">
                      <span className="font-medium cursor-pointer text-cyan-600 hover:text-cyan-500">
                        Sign up
                      </span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
