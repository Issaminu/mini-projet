import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/enset-logo.webp";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { userState } from "../store/atoms";
import { useRecoilState } from "recoil";
import LoadingBar from "react-top-loading-bar";
import { useCallback } from "react";
export function Signup(props) {
  const { data: session, status } = useSession();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const name = useRef<HTMLInputElement>();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsPasswordValid(true);
    if (session) {
      setUser(session.user);
      router.push("/dashboard");
    }
  }, [session]);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      ref.current.staticStart();
      axios
        .post("/api/auth/signup", {
          email: email.current.value,
          name: name.current.value,
          password: password.current.value,
        })
        .then(async (res) => {
          ref.current.complete();
          await signIn("credentials", {
            redirect: false,
            email: email.current.value,
            password: password.current.value,
            callbackUrl: `${window.location.origin}`,
          });
        })
        .catch((error) => {
          ref.current.complete();
          setIsLoading(false);
          const response = error.response.data;
          if (
            response.errorType == "email_not_valid" ||
            response.errorType == "User_email_key"
          ) {
            setIsEmailValid(false);
            setEmailError(response.error);
          } else if (
            response.errorType == "name_not_alphabet" ||
            response.errorType == "name_length"
          ) {
            setIsNameValid(false);
            setNameError(response.error);
          } else if (response.errorType == "password_length") {
            setIsPasswordValid(false);
            setPasswordError(response.error);
          }
        });
    },
    [email, name, password]
  );

  if (status == "loading") return null;
  if (!session) {
    return (
      <>
        <div
          className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
          style={{
            background: "url('/login-bg.webp') no-repeat center center fixed",
            backgroundSize: "cover",
            minHeight: "100vh",
          }}
        >
          <div className="mt-8 sm:mx-auto sm:w-96 sm:max-w-md">
            <div className="bg-white pt-14 pb-6 px-4 shadow sm:rounded-2xl sm:px-12">
              <LoadingBar height={3} color="#06b6d4" ref={ref} />
              <div className="sm:mx-auto mb-10 sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                  <Image
                    className="mx-auto h-10 w-auto"
                    src={logo}
                    alt="ENSET's logo"
                    priority={true}
                  />
                </div>
                <h2
                  className="mt-6 text-center text-3xl font-semibold "
                  style={{ color: "#1e212a" }}
                >
                  Welcome!
                </h2>
                <p className="mt-2 text-center text-sm text-gray-900">
                  Please sign up with your email below
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  {isNameValid ? (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          ref={name}
                          autoComplete="name"
                          required
                          autoFocus
                          className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          ref={name}
                          required
                          autoComplete="name"
                          className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          aria-invalid="true"
                          aria-describedby="name-error"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="name-error">
                        {nameError}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  {isEmailValid ? (
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
                          className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          ref={email}
                          autoComplete="email"
                          required
                          className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          aria-invalid="true"
                          aria-describedby="email-error"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {emailError}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  {isPasswordValid ? (
                    <div>
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
                          className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          ref={password}
                          autoComplete="password"
                          required
                          className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          aria-invalid="true"
                          aria-describedby="password-error"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="password-error"
                      >
                        {passwordError}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
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
                      className="w-full h-11 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center h-full">Sign up</div>
                    </button>
                  </div>
                  <div className="text-sm">
                    Already have an account? &nbsp;
                    <Link href="/login">
                      <span className="font-medium cursor-pointer text-cyan-600 hover:text-cyan-500">
                        Sign in
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

export default Signup;
