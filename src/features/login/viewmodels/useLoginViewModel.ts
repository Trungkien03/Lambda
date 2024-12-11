import useUserFirestore from "@app/hooks/firestores/useUserFirestore";
import useAppNavigation from "@app/hooks/useAppNavigation";
import useGoogleSignIn from "@app/hooks/useGoogleSignIn";
import { useAppDispatch, useAppSelector } from "@app/stores";
import { setUser } from "@app/stores/slices/auth.slice";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import _ from "lodash";
import { useCallback, useEffect } from "react";
import { setEmail, setIsLoginLoading, setPassword } from "../slices";

const useLoginViewModel = () => {
  const { email, password, isLoading } = useAppSelector(
    (state) => state.loginView,
  );

  const { navigation } = useAppNavigation();
  const dispatch = useAppDispatch();

  const { configureGoogleSignIn, signIn } = useGoogleSignIn();
  const { findUserByEmail, findUserByEmailAndPassword } = useUserFirestore();

  useEffect(() => {
    configureGoogleSignIn();
  }, [configureGoogleSignIn]);

  const handleChangeEmail = useCallback(
    _.debounce((text: string) => {
      dispatch(setEmail(text));
    }, 300),
    [dispatch],
  );

  const handleChangePassword = useCallback(
    _.debounce((text: string) => {
      dispatch(setPassword(text));
    }, 300),
    [dispatch],
  );

  const handlePressSignInGoogle = async () => {
    try {
      dispatch(setIsLoginLoading(true));
      const response = await signIn();

      const user = await findUserByEmail(response?.email ?? "");
      if (user) {
        dispatch(setUser(user));
        navigation.navigate("main");
      }
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
      dispatch(setIsLoginLoading(false));
    }
  };

  const handlePressSignInForm = async () => {
    try {
      // Kiểm tra xem email và password có trống không
      if (
        !email ||
        !password ||
        email.trim() === "" ||
        password.trim() === ""
      ) {
        dispatch(
          showDialog({
            title: "Error",
            content: "Email và password không được để trống",
            type: DialogType.WARNING,
          }),
        );
        return;
      }

      dispatch(setIsLoginLoading(true));
      const user = await findUserByEmailAndPassword(email, password);
      if (user) {
        dispatch(setUser(user));
        navigation.navigate("main");
      } else {
        dispatch(
          showDialog({
            title: "Error",
            content: "Email hoặc mật khẩu không đúng",
            type: DialogType.ERROR,
          }),
        );
      }
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
      dispatch(setIsLoginLoading(false));
    }
  };

  return {
    handleChangeEmail,
    handleChangePassword,
    handlePressSignInGoogle,
    handlePressSignInForm,
  };
};

export default useLoginViewModel;
