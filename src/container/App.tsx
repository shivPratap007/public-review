import { useEffect } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import useStore from "../store/store";

function App() {
  const fetchFeedback = useStore((state) => state.fetchFeedback);

  useEffect(()=>{
    fetchFeedback();
  },[])
  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
