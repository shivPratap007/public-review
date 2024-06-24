import FeedBackForm from "../feedback/FeedBackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";
import { useFeedBackItemContext } from "./Hooks";

export default function Header() {
  const{handleAddToList}=useFeedBackItemContext()
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedBackForm handleAddToList={handleAddToList} />
    </header>
  );
}
