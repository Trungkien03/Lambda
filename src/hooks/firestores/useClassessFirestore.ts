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

  const searchClasses = async (title?: string): Promise<Class[]> => {
    try {
      let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> =
        firestore().collection("yoga_classes");

      const snapshot = await query.get();

      let results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Class[];

      if (title) {
        results = results.filter((doc) =>
          doc.title.toLowerCase().includes(title.toLowerCase()),
        );
      }

      return results;
    } catch (error) {
      console.error("Error searching classes:", error);
      throw error;
    }
  };

  /**
   * Fetch a class by its ID
   * @param id The ID of the class
   * @returns A Promise resolving to the Class object or null if not found
   */
  const getClassById = async (id: string): Promise<Class | null> => {
    try {
      const doc = await firestore().collection("yoga_classes").doc(id).get();

      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data(),
        } as Class;
      } else {
        console.warn(`Class with id ${id} not found.`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching class with id ${id}:`, error);
      throw error;
    }
  };

  return {
    fetchClasses,
    searchClasses,
    getClassById,
  };
};

export default useClassesFirestore;
