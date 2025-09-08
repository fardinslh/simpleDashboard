"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { localstorageKeys } from "@/constants/localstorageKeys";
import { loggedIn, loggedOut, setLoading } from "@/lib/store/authSlice";

function StateUpdater() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const user = localStorage.getItem(localstorageKeys.user);

      if (user) {
        JSON.parse(user);
        dispatch(loggedIn());
      } else {
        dispatch(loggedOut());
      }
    } catch {
      dispatch(loggedOut());
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return null;
}

export default StateUpdater;
