"use client";

import { localstorageKeys } from "@/constants/localstorageKeys";
import { loggedIn, setLoading } from "@/lib/store/authSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useEffect } from "react";

function StateUpdater(): React.ReactNode {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem(localstorageKeys.user);

    if (user) {
      dispatch(loggedIn());
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return null;
}

export default StateUpdater;
