import { createContext, useEffect, useState } from "react";
import { FeedBackItemInterface } from "../lib/types";

export type TFeedBackItemContext = {
  feedBackItems: FeedBackItemInterface[];
  isLoading: boolean;
  errorMessage: string;
  companies: string[];
  handleAddToList: (text: string) => void;
  selectedCompany: string;
  filterCompanies: FeedBackItemInterface[];
  handleSelectedCompany: (text: string) => void;
};

export const FeedBackItemContext = createContext<TFeedBackItemContext | null>(
  null
);
export default function FeedbackItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [feedBackItems, setFeedBackItems] = useState<FeedBackItemInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const companies: string[] = feedBackItems
    .map((item) => item.company)
    .filter((company, index, array) => array.indexOf(company) === index);

  function handleAddToList(text: string) {
    const companyNameFormText: string =
      text
        ?.split(" ")
        ?.find((word) => word.includes("#"))
        ?.substring(1) ?? "";
    const newItem: FeedBackItemInterface = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyNameFormText.substring(0, 1).toUpperCase(),
      company: companyNameFormText,
      text: text,
      daysAgo: 0,
    };
    setFeedBackItems((prev) => [...prev, newItem]);
  }

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
    setIsLoading(true);
    setErrorMessage("");
    fetchReviews()
      .then((data) => {
        console.log(data);
        setFeedBackItems(data.feedbacks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Network response was not ok");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [selectedCompany, setSelectedCompany] = useState<string>("All");

  const filterCompanies: FeedBackItemInterface[] =
    selectedCompany == "All"
      ? feedBackItems
      : feedBackItems.filter((item) => item.company === selectedCompany);

  function handleSelectedCompany(text: string) {
    setSelectedCompany(text);
  }
  return (
    <FeedBackItemContext.Provider
      value={{
        feedBackItems,
        isLoading,
        errorMessage,
        companies,
        handleAddToList,
        handleSelectedCompany,
        filterCompanies,
        selectedCompany,
      }}
    >
      {children}
    </FeedBackItemContext.Provider>
  );
}
