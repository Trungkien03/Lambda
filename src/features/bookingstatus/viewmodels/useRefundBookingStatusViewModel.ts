import useAppNavigation from "@app/hooks/useAppNavigation";
import { useAppDispatch } from "@app/stores";

const useRefundBookingStatusViewModel = () => {
  const { navigation } = useAppNavigation();

  const dispatch = useAppDispatch();

  return {};
};

export default useRefundBookingStatusViewModel;
