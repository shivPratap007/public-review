import { useContext } from "react";
import {
  FeedBackItemContext,
  TFeedBackItemContext,
} from "../context/FeedbackItemContextProvider";

export function useFeedBackItemContext(): TFeedBackItemContext {
  const context = useContext(FeedBackItemContext);
  if (!context) {
    throw new Error("Feedback context is not defined");
  }
  return context;
}
