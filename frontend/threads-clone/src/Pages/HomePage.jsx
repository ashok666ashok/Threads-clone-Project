import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../Components/Post";
import { useRecoilState, useRecoilValue } from "recoil";
import postAtom from "../atoms/postAtom";
import userAtom from "../atoms/userAtom";
import SuggestedUsers from "../Components/SuggestedUsers";
import { BsThreadsFill } from "react-icons/bs";

function HomePage() {
  const user = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true);
      // setPosts([])
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPost();
  }, [showToast, setPosts]);
  return (
    <Flex gap={10} alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <Text
            position={"relative"}
            left={"5%"}
            display={"grid"}
            placeItems={"center"}
            h={"300px"}
            fontStyle={"oblique"}
            fontWeight={"bolder"}
            fontSize={"25px"}
          >
            Follow some user to see the feed
          </Text>
        )}

        {loading && (
          <Flex justifyContent={"center"} mt={10}>
            <Spinner size={"xl"} />
          </Flex>
        )}
        {!user && <h1> please login...</h1>}
        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>

      <Box
        flex={30}
        py={5}
        mt={20}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  );
}

export default HomePage;
