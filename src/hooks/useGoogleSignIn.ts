import { useAppDispatch } from "@app/stores";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useCallback } from "react";

const WEB_CLIENT_ID =
  "858190888007-jg7spdk3dd6guubt1b5du5j8abjuiuuf.apps.googleusercontent.com";

const useGoogleSignIn = () => {
  const dispatch = useAppDispatch();

  // Hàm hiển thị dialog lỗi
  const handleShowError = useCallback(
    (text: string) => {
      dispatch(
        showDialog({
          title: "Error",
          content: text,
          type: DialogType.ERROR,
        }),
      );
    },
    [dispatch],
  );

  const configureGoogleSignIn = useCallback(() => {
    GoogleSignin.configure({
      scopes: ["profile", "email"],
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.signOut();
      const playServicesAvailable = await GoogleSignin.hasPlayServices();
      if (!playServicesAvailable) {
        handleShowError("Google Play Services không khả dụng");
        return;
      }

      // Perform Google Sign-In
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken } = response.data;
        console.log(idToken);

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        const userCredential =
          await auth().signInWithCredential(googleCredential);
        console.log("Firebase User:", userCredential.user);

        return userCredential.user; // Return Firebase user
      } else {
        console.log("Sign-in cancelled by user");
        handleShowError("Đăng nhập đã bị hủy bởi người dùng");
      }
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            handleShowError("Đăng nhập đang trong quá trình thực hiện");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            handleShowError("Google Play Services không khả dụng");
            break;
          default:
            handleShowError(`Một lỗi không xác định xảy ra: ${error.message}`);
        }
      } else {
        handleShowError(
          `Lỗi không liên quan đến Google Sign-In: ${error.message}`,
        );
      }
    }
  };

  // Hàm đăng xuất
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error: any) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return { configureGoogleSignIn, signIn, signOut };
};

export default useGoogleSignIn;
