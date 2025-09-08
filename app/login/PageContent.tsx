"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { regex } from "@/constants/regex";
import { login } from "@/apiCalls/login";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { localstorageKeys } from "@/constants/localstorageKeys";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CAmbientCircles from "@/components/CAmbientCircles";
import { loggedIn } from "@/lib/store/authSlice";
import CLoadingSpinner from "@/components/CLoadingSpinner";

const PHONE_NUMBER_ERROR =
  "Please enter a valid number: 09123456789, +989123456789, or 00989123456789";

type FormData = {
  phoneNumber: string;
};

export type UserLoginData = {
  name: {
    first: string;
    title: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  phoneNumber: string;
};

function LoginPageContent(): React.ReactNode {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        router.replace(routes.dashboard);
      }
    }
  }, [isLoggedIn, isLoading]);
  // if you have a warning here is actually for using router. router is recognized as a variable here but it will be always stable during the renders. So adding or not adding it as a dependency won't affect anything and does not cause the app to crash.

  async function onSubmit(formData: FormData): Promise<void> {
    setLoading(true);
    try {
      const user = (await login()).results[0];
      dispatch(loggedIn());
      const userLoginData: UserLoginData = {
        name: {
          first: user.name.first,
          last: user.name.last,
          title: user.name.title,
        },
        email: user.email,
        picture: {
          large: user.picture.large,
          medium: user.picture.medium,
          thumbnail: user.picture.thumbnail,
        },
        phoneNumber: formData.phoneNumber,
      };

      localStorage.setItem(
        localstorageKeys.user,
        JSON.stringify(userLoginData),
      );
      router.push(routes.dashboard);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <CAmbientCircles />

      <div className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full px-4 sm:px-0"
        >
          <Card className="border-zinc-800/60 bg-zinc-900/40 backdrop-blur-xl shadow-2xl shadow-black/40">
            <CardContent>
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email" className="text-white">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Controller
                      name="phoneNumber"
                      control={control}
                      defaultValue={""}
                      rules={{
                        validate: (value) =>
                          regex.fullPersianPhoneNumber.test(value) ||
                          PHONE_NUMBER_ERROR,
                      }}
                      render={({ field: { onChange, name, value } }) => (
                        <div className="flex flex-col gap-1">
                          <Input
                            placeholder="09123456789"
                            className="bg-zinc-900/60 border-zinc-700/60 focus-visible:ring-fuchsia-500 text-white"
                            style={{ paddingLeft: 10 }}
                            name={name}
                            value={value}
                            inputMode="tel"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (regex.partialPersianPhoneNumber.test(value)) {
                                onChange(value);
                              }
                            }}
                          />
                          {errors.phoneNumber && (
                            <p className="text-red-600 font-bold">
                              {errors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className={`mt-2 h-11 w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-900/30 transition-transform hover:translate-y-[-1px] hover:shadow-xl focus-visible:ring-fuchsia-500 ${
                    loading ? "" : "cursor-pointer"
                  }`}
                >
                  {loading ? <CLoadingSpinner /> : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPageContent;
