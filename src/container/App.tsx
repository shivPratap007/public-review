import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import FeedbackItemContextProvider from "../context/FeedbackItemContextProvider";

function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackItemContextProvider>
        <Container />
        <HashtagList />
      </FeedbackItemContextProvider>
    </div>
  );
}

export default App;
