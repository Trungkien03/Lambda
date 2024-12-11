import { BottomTabParams } from "@app/navigations/types/BottomTabParams.type";
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const useAppNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const bottomTabNavigation =
    useNavigation<BottomTabNavigationProp<BottomTabParams>>();
  return {
    navigation,
    bottomTabNavigation,
  };
};

export default useAppNavigation;
