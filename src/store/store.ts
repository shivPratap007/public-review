import { create } from "zustand";
import { FeedBackItemInterface } from "../lib/types";

interface StoreState {
  feedBackItems: FeedBackItemInterface[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  companies: string[];
  filterCompanies: FeedBackItemInterface[];
  getCompanyList: () => string[];
  getFilteredCompanyList: () => FeedBackItemInterface[];
  handleAddToList: (text: string) => void;
  handleSelectedCompany: (text: string) => void;
  fetchFeedback: () => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  feedBackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "All",
  companies: [],
  filterCompanies: [],
  getCompanyList: () => {
    const { feedBackItems } = get();
    return feedBackItems
      .map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFilteredCompanyList: () => {
    const { feedBackItems, selectedCompany } = get();
    return selectedCompany === "All"
      ? feedBackItems
      : feedBackItems.filter((item) => item.company === selectedCompany);
  },
  handleAddToList: (text: string) => {
    const companyNameFromText: string =
      text
        ?.split(" ")
        ?.find((word) => word.includes("#"))
        ?.substring(1) ?? "";
    const newItem: FeedBackItemInterface = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyNameFromText.substring(0, 1).toUpperCase(),
      company: companyNameFromText,
      text: text,
      daysAgo: 0,
    };
    set((state) => ({ feedBackItems: [...state.feedBackItems, newItem] }));
  },
  handleSelectedCompany: (text: string) => {
    set(() => ({ selectedCompany: text }));
  },
  fetchFeedback: async () => {
    try {
      set({ isLoading: true, errorMessage: "" });
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      set({ feedBackItems: data.feedbacks, isLoading: false });
    } catch (error) {
      set({ errorMessage: "Network response was not ok", isLoading: false });
    }
  },
}));

export default useStore;
