/* eslint-disable react-hooks/exhaustive-deps */
import useClassesFirestore from "@app/hooks/firestores/useClassessFirestore";
import { useAppDispatch, useAppSelector } from "@app/stores";
import BottomSheet from "@gorhom/bottom-sheet";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilterSearchType } from "../models";
import { setSearchClassResults, setSearchQuery } from "../slices";

const useSearchViewModel = () => {
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isShowingBottomSheet, setIsShowingBottomSheet] = useState(false);
  const { searchQuery } = useAppSelector((state) => state.searchView);

  const { searchClasses } = useClassesFirestore();

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      const response = await searchClasses(query);
      dispatch(setSearchClassResults(response));
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch("");
  }, []);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    debouncedSearch(query);
  };

  const openBottomSheet = () => {
    setIsShowingBottomSheet(true);
    bottomSheetRef.current?.expand();
  };

  const applyFilter = async (filters: FilterSearchType) => {
    const { startDate, endDate, startTime, endTime } = filters;

    try {
      const response = await searchClasses(searchQuery);

      const filteredClasses = response.filter((classItem: any) => {
        const classDate = new Date(classItem.date); // Convert class date string to Date object
        const classTime = classItem.time; // Class time string in "HH:mm" format

        // Validate date range
        const isDateInRange =
          (!startDate || classDate >= startDate) &&
          (!endDate || classDate <= endDate);

        // Validate time range
        const isTimeInRange =
          (!startTime || classTime >= startTime) &&
          (!endTime || classTime <= endTime);

        return isDateInRange && isTimeInRange;
      });

      dispatch(setSearchClassResults(filteredClasses));

      console.log("Filtered Classes:", filteredClasses);
    } catch (error) {
      console.error("Error filtering classes:", error);
    } finally {
      bottomSheetRef.current?.close();
    }
  };

  return {
    bottomSheetRef,
    handleSearch,
    openBottomSheet,
    applyFilter,
    isShowingBottomSheet,
    setIsShowingBottomSheet,
  };
};

export default useSearchViewModel;
