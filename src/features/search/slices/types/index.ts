import Class from "@app/stores/models/Class.model";

type searchViewState = {
  searchQuery: string;
  searchResult: {
    data: Class[];
    isLoadingSearch: boolean;
  };
};

const initialSearchViewState: searchViewState = {
  searchQuery: "",
  searchResult: {
    data: [],
    isLoadingSearch: false,
  },
};

export { initialSearchViewState };
export type { searchViewState };
