import FeedBackItem from "./FeedBackItem";
import Spinner from "../container/Spinner";
import ErrorMessage from "../container/ErrorMessage";
import { useFeedBackItemContext } from "../container/Hooks";

export default function FeedbackList() {
  const { isLoading, errorMessage, feedBackItems } = useFeedBackItemContext();
  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {feedBackItems.map((feedBackItem) => (
        <FeedBackItem key={feedBackItem.text} feedBackItem={feedBackItem} />
      ))}
    </ol>
  );
}
