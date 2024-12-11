import useClassesFirestore from "@app/hooks/firestores/useClassessFirestore";
import { useAppDispatch } from "@app/stores";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { useEffect } from "react";
import { setHomeViewClasses, setIsGetClassLoading } from "../slices";

const useHomeViewModel = () => {
  const { fetchClasses } = useClassesFirestore();
  const dispatch = useAppDispatch();

  const handleFetchingClasses = async () => {
    try {
      dispatch(setIsGetClassLoading(true));
      const response = await fetchClasses();
      console.log(response);

      dispatch(setHomeViewClasses(response));
    } catch (error: any) {
      console.log(error);
      dispatch(
        showDialog({
          title: "Error",
          content: error.message,
          type: DialogType.ERROR,
        }),
      );
    } finally {
      dispatch(setIsGetClassLoading(false));
    }
  };

  useEffect(() => {
    handleFetchingClasses();
  }, []);

  return;
};

export default useHomeViewModel;
