import { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { setLoading } from "./loading/loadingSlice";

export type ActionType = {
  type: string;
  payload?: any;
  error?: string;
};

const toastAndLoadingMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (action.type.endsWith("/pending")) {
      dispatch(setLoading(true));
    }

    if (action.type.endsWith("/fulfilled")) {
      dispatch(setLoading(false));
      toast.success("Success ✅");
    }

    if (action.type.endsWith("/rejected")) {
      dispatch(setLoading(false));
      toast.error("Something went wrong ❌");
    }

    return next(action);
  };

export default toastAndLoadingMiddleware;
