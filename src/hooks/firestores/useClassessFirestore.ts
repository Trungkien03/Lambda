import Class from "@app/stores/models/Class.model";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

const useClassesFirestore = () => {
  const fetchClasses = async (): Promise<Class[]> => {
    try {
      const snapshot = await firestore().collection("yoga_classes").get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Class[];
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  };

  const searchClasses = async (
    title?: string,
    date?: string,
    time?: string,
  ): Promise<Class[]> => {
    try {
      // Khởi tạo query với kiểu `Query<DocumentData>`
      let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> =
        firestore().collection("classes");

      // Áp dụng các điều kiện linh hoạt theo tiêu chí đã cung cấp
      if (title) {
        query = query.where("title", "==", title);
      }
      if (date) {
        query = query.where("date", "==", date);
      }
      if (time) {
        query = query.where("time", "==", time);
      }

      const snapshot = await query.get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Class[];
    } catch (error) {
      console.error("Error searching classes:", error);
      throw error;
    }
  };

  return {
    fetchClasses,
    searchClasses,
  };
};

export default useClassesFirestore;
