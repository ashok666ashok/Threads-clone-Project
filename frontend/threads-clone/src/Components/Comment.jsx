import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import PostActions from "./PostActions";
import useGetUserProfile from "../hooks/useGetUserProfile";

function Comment({reply , lastReply}) {
  // const [liked, setLiked] = useState(false);
  

  return (
    <>
      <Flex gap={2} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
            {/* <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                {createAt}
              </Text>
              <BsThreeDots />
            </Flex> */}
          </Flex>
          <Text>{reply.text}</Text>
          {/* <PostActions liked={liked} setLiked={setLiked} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {likes + (liked ? 1 : 0)} likes
          </Text>  */}
        </Flex>
      </Flex>
      {lastReply?null:<Divider/>}
    </>
  );
}

export default Comment;
