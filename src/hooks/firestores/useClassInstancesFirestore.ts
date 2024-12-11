import Instance from "@app/stores/models/Instance.model";
import firestore from "@react-native-firebase/firestore";

const useClassInstancesFirestore = () => {
  const fetchInstancesByClassId = async (
    classId: string,
  ): Promise<Instance[]> => {
    try {
      const snapshot = await firestore()
        .collection("instances")
        .where("class_id", "==", classId)
        .get();

      const instances = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as Instance;
      });

      return instances;
    } catch (err) {
      console.error("Error fetching instances:", err);
      throw new Error("Failed to fetch class instances. Please try again.");
    }
  };

  return {
    fetchInstancesByClassId,
  };
};

export default useClassInstancesFirestore;
