import TextView from "@app/components/UI/TextView";
import useUserFirestore from "@app/hooks/firestores/useUserFirestore";
import { useAppDispatch } from "@app/stores";
import Instance from "@app/stores/models/Instance.model";
import User from "@app/stores/models/User.model";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { ThemeType } from "@app/themes";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Box, HStack, Icon, useTheme, VStack } from "native-base";

import React, { useLayoutEffect, useState } from "react";

type InstanceItemProps = {
  instance: Instance;
};

const InstanceItem = ({ instance }: InstanceItemProps) => {
  const theme = useTheme() as ThemeType;
  const [instructor, setInstructor] = useState<User | null>(null); // Renamed state for clarity
  const { findUserById } = useUserFirestore();
  const dispatch = useAppDispatch();

  const handleFetchingInstructor = async () => {
    try {
      const response = await findUserById(instance.instructor_id);
      setInstructor(response);
    } catch (error: any) {
      dispatch(
        showDialog({
          title: "Error",
          content: error.message,
          type: DialogType.ERROR,
        }),
      );
    }
  };

  useLayoutEffect(() => {
    handleFetchingInstructor();
  }, []);

  return (
    <VStack
      bg={theme.colors.backgroundCourseCard}
      p={4}
      borderRadius="md"
      mb={2}
      space={2}
    >
      <TextView fontSize="md" fontWeight="bold" color="black">
        {instance.title}
      </TextView>
      <HStack alignItems="center" space={2}>
        <Icon as={Ionicons} name="calendar" size="sm" color="green.500" />
        <TextView fontSize="sm" color="gray.600">
          Date: {instance.instance_date}
        </TextView>
      </HStack>
      {/* Show Instructor Information */}
      {instructor && (
        <Box>
          <HStack alignItems="center" space={2}>
            <Avatar source={{ uri: instructor.profile_image }} size={"xs"} />
            <TextView fontSize="sm" color="gray.600">
              {instructor.name}
            </TextView>
          </HStack>
        </Box>
      )}
      <TextView fontSize="sm" color="gray.600">
        Notes: {instance.notes}
      </TextView>
    </VStack>
  );
};

export default InstanceItem;
