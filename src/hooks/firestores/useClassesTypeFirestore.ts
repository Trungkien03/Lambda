import ClassType from "@app/stores/models/ClassType.model";
import firestore from "@react-native-firebase/firestore";

const useClassesTypeFirestore = () => {
  const fetchClassTypeById = async (id: string): Promise<ClassType | null> => {
    try {
      const doc = await firestore().collection("class_types").doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as ClassType;
      } else {
        console.error("Class type not found");
        return null;
      }
    } catch (err) {
      console.error("Error fetching class type:", err);
      return null;
    }
  };

  return {
    fetchClassTypeById,
  };
};

export default useClassesTypeFirestore;
