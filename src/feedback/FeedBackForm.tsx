import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";
export default function FeedBackForm({
  handleAddToList,
}: {
  handleAddToList: (text: string) => void;
}) {
  const [text, setText] = useState<string>("");

  const [hashTagCheckTrue, setHashTagCheckTrue] = useState<boolean>(false);
  const [hashTagCheckFalse, setHashTagCheckFalse] = useState<boolean>(false);

  const charCount = MAX_CHARACTERS - text.length;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(e.target.value);
    setHashTagCheckFalse(false);
  }

  function handleInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.includes("#") && text.length > 5) {
      setHashTagCheckTrue(true);
      handleAddToList(text);
      setTimeout(() => {
        setHashTagCheckTrue(false);
      }, 2000);
    } else {
      setHashTagCheckFalse(true);
    }
    setText("");
  }
  return (
    <form
      className={`form ${hashTagCheckFalse ? "form--invalid" : ""} ${
        hashTagCheckTrue ? "form--valid" : ""
      } `}
      onSubmit={(e) => handleInput(e)}
    >
      <textarea
        value={text}
        onChange={(e) => handleChange(e)}
        name=""
        id="feedback-textarea"
        placeholder="Enter your feedback here, remember to #hashtag the company."
        spellCheck={false}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>Submit</button>
      </div>
    </form>
  );
}
