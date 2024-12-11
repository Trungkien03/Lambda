import useBookingsFirestore from "@app/hooks/firestores/useBookingsFirestore";
import useTransactionFirestore from "@app/hooks/firestores/useTransactionFirestore";
import useAppNavigation from "@app/hooks/useAppNavigation";
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { useAppDispatch, useAppSelector } from "@app/stores";
import Transaction from "@app/stores/models/Transaction.model";
import { hideDialog, showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import Clipboard from "@react-native-clipboard/clipboard";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Toast } from "native-base";
import { setIsLoadingAddTransaction, setIsOpenDialog } from "../slices";

const usePaymentViewModel = () => {
  const dispatch = useAppDispatch();
  const { navigation } = useAppNavigation();
  const { user } = useAppSelector((state) => state.auth);

  const route = useRoute<RouteProp<RootStackParams, "payment">>();
  const { bookings } = route.params;

  const { addTransaction } = useTransactionFirestore();
  const { updateBookingStatus } = useBookingsFirestore();

  // Example class payment data
  const bankPaymentData = {
    bankDetails: {
      accountName: "DAO VINH LOC",
      accountNumber: "123456789",
      bankName: "TPBank",
    },
    transferMessage: "PAY-CLASS-1247",
  };

  // Handle copying text to clipboard
  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Toast.show({
      title: "Copied to clipboard",
      duration: 2000,
    });
  };

  const handleConfirmCheckout = async () => {
    dispatch(
      showDialog({
        title: "Confirm",
        content: "Have you successfully completed the bank transfer?",
        type: DialogType.ALERT,
        onConfirm: async () => {
          try {
            if (!user?.id) {
              dispatch(
                showDialog({
                  title: "error",
                  content: "User not found",
                  type: DialogType.ERROR,
                  onConfirm() {
                    dispatch(hideDialog());
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "login" }],
                    });
                  },
                }),
              );
              return;
            }
            dispatch(setIsLoadingAddTransaction(true));
            dispatch(hideDialog());

            // Create a transaction
            const transactionData: Transaction = {
              id: new Date().toISOString().replace(/[-:.TZ]/g, ""),
              user_id: user.id,
              bookings: bookings.map((booking) => booking.id),
              amount: bookings.reduce(
                (total, booking) => total + booking.total_amount,
                0,
              ), // Sum of booking amounts
              payment_method: "Bank Transfer",
              transaction_message: bankPaymentData.transferMessage,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "Completed",
            };

            const transactionId = await addTransaction(transactionData);
            console.log("Transaction successfully created:", transactionId);

            bookings.map(async (item) => {
              console.log("Updating booking with ID:", item.id);
              await updateBookingStatus(item.id, "Pending", "Paid");
            });

            dispatch(setIsOpenDialog(false));
            navigation.navigate("paymentSuccess");
          } catch (error) {
            console.error("Error creating transaction:", error);
            Toast.show({
              title: "Failed to process transaction. Please try again.",
              duration: 3000,
            });
          } finally {
            dispatch(setIsLoadingAddTransaction(false));
          }
        },
        onCancel: () => {
          console.log("User canceled the confirmation.");
          dispatch(hideDialog());
        },
      }),
    );
  };

  return {
    bankPaymentData,
    handleCopy,
    handleConfirmCheckout,

    bookings,
  };
};

export default usePaymentViewModel;
