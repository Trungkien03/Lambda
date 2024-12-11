import Transaction from "@app/stores/models/Transaction.model";
import firestore from "@react-native-firebase/firestore";

const TRANSACTIONS_COLLECTION = "transactions";

const useTransactionFirestore = () => {
  const addTransaction = async (transaction: Transaction): Promise<string> => {
    try {
      if (!transaction.id) {
        throw new Error("Transaction ID is required.");
      }

      const transactionRef = firestore()
        .collection(TRANSACTIONS_COLLECTION)
        .doc(transaction.id);

      await transactionRef.set(transaction);

      console.log("Transaction added with ID:", transaction.id);
      return transaction.id;
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  };

  return {
    addTransaction,
  };
};

export default useTransactionFirestore;
