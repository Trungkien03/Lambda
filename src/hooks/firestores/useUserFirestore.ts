import { useAppDispatch } from "@app/stores";
import User from "@app/stores/models/User.model";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import firestore from "@react-native-firebase/firestore";

const useUserFirestore = () => {
  const dispatch = useAppDispatch();

  const handleShowDialogError = (message: string) => {
    dispatch(
      showDialog({
        title: "Error",
        content: message as string,
        type: DialogType.ERROR,
      }),
    );
  };

  const findUserByEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .where("password", "==", password) // Không nên lưu mật khẩu dưới dạng plaintext
        .get();

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() } as User;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding user by email and password:", error);
      handleShowDialogError("Error finding user by email and password");
      throw error;
    }
  };

  const findUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!userSnapshot.empty) {
        // Nếu tìm thấy người dùng, lấy document đầu tiên
        const userDoc = userSnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() } as User;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding user by email:", error);
      handleShowDialogError("Error finding user by email");
      throw error;
    }
  };

  const findUserById = async (userId: string): Promise<User | null> => {
    try {
      const userDoc = await firestore().collection("users").doc(userId).get();

      if (userDoc.exists) {
        return { id: userDoc.id, ...userDoc.data() } as User;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding user by ID:", error);
      handleShowDialogError("Error finding user by ID");
      throw error;
    }
  };

  return {
    findUserByEmailAndPassword,
    findUserByEmail,
    findUserById,
  };
};

export default useUserFirestore;
