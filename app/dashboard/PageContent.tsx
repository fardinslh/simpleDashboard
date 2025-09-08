"use client";

import { localstorageKeys } from "@/constants/localstorageKeys";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserLoginData } from "@/app/login/PageContent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import CAmbientCircles from "@/components/CAmbientCircles";
import { loggedOut } from "@/lib/store/authSlice";
import CLoadingSpinner from "@/components/CLoadingSpinner";

function DashboardPageContent(): React.ReactNode {
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserLoginData>();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem(localstorageKeys.user);
    if (!isLoading) {
      if (isLoggedIn && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        onLogout();
        router.replace(routes.login);
      }
    }
  }, [isLoading, isLoggedIn]);
  // if you have a warning here is actually for using router. router is recognized as a variable here but it will be always stable during the renders. So adding or not adding it as a dependency won't affect anything and does not cause the app to crash.

  async function onLogout() {
    setLogoutLoading(true);
    localStorage.removeItem(localstorageKeys.user);
    dispatch(loggedOut());
    await new Promise((resolve) => setTimeout(resolve, 250));
    router.push(routes.login);
  }

  const firstName = user?.name.first;
  const lastName = user?.name.last;

  const initials = firstName?.[0].toUpperCase();

  return (
    <div className="h-full w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <CAmbientCircles />
      <div className="w-full p-5">
        <div className="flex items-center justify-between mb-5">
          {isLoading ? (
            <div className="h-[44px] ml-20 pt-3">
              <CLoadingSpinner className="size-8 max-sm:size-5" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-zinc-900 text-zinc-200">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-zinc-400">Signed in as</p>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-zinc-100">{firstName}</p>
                  <p className="font-medium text-zinc-100">{lastName}</p>
                </div>
              </div>
            </div>
          )}
          <Button
            onClick={onLogout}
            disabled={isLoading || logoutLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-indigo-600 w-24"
          >
            {isLoading || logoutLoading ? (
              <div>
                <CLoadingSpinner />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div>
                  <BiLogOut className="size-4" />
                </div>
                <div>Logout</div>
              </div>
            )}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-zinc-800/60 bg-zinc-900/40 backdrop-blur-xl shadow-2xl shadow-black/40 w-full">
            <CardHeader>
              <CardTitle className="text-2xl tracking-tight text-white">
                Welcome back {firstName}👋
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardPageContent;
