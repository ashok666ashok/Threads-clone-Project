import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

function SettingsPage() {
  const showToast = useShowToast();
  const logout =useLogout()
  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account")) return;

    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if(data.error){
        showToast("Error", data.error, "error");
        return;
      }
      if(data.success){
        await logout()
        showToast("Success", "Your Account has been frozen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Box mt={"60px"} display={"grid"} placeItems={"center"}>
        <Text my={1} fontWeight={"bold"}>
          Freeze Your Account
        </Text>
        <Text my={1}>You can Unfreeze your account anytime by logging in.</Text>
        <Button colorScheme="red" size={"sm"} onClick={freezeAccount}>
          Freeze
        </Button>
      </Box>
    </>
  );
}

export default SettingsPage;
