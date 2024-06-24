import FeedBackItem from "./FeedBackItem";
import Spinner from "../container/Spinner";
import ErrorMessage from "../container/ErrorMessage";
import useStore from "../store/store";

export default function FeedbackList() {
  const isLoading = useStore((state) => state.isLoading);
  const errorMessage = useStore((state) => state.errorMessage);
  const feedBackItems = useStore((state) => state.getFilteredCompanyList());

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
