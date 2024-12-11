import { useAppDispatch } from "@app/stores";
import { setUser } from "@app/stores/slices/auth.slice";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import useUserFirestore from "./firestores/useUserFirestore";
import useAppNavigation from "./useAppNavigation";

const useAuthentication = () => {
  const { navigation } = useAppNavigation();
  const dispatch = useAppDispatch();
  const { findUserByEmail } = useUserFirestore();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      console.log(user);

      if (user?.email) {
        const response = await findUserByEmail(user.email);
        dispatch(setUser(response));
        navigation.navigate("main");
      } else {
        navigation.navigate("login");
      }
    });

    return unsubscribe;
  }, []);

  return;
};

export default useAuthentication;
