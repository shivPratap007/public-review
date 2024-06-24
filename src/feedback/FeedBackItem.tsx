import {  useState } from "react";
import { FeedBackItemInterface } from "../lib/types";

export default function FeedBackItem({
  feedBackItem,
}: {
  feedBackItem: FeedBackItemInterface;
}) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedBackItem.upvoteCount);
  function handleUpvote(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setUpvoteCount((prev) => ++prev);
    e.currentTarget.disabled = true;
  }
  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={handleUpvote}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
        </svg>
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedBackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedBackItem.company}</p>
        <p>{feedBackItem.text}</p>
      </div>
      <p>{feedBackItem.daysAgo === 0 ? "NEW" : `${feedBackItem.daysAgo}d`}</p>
    </li>
  );
}
