import React, { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
// import UserPost from "../Components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../Components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";

function UserPage() {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getUserPost = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data)
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getUserPost();
  }, [username, showToast, setPosts, user]);
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} mt={10}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) {
    return (
      <Flex justifyContent={"center"} mt={10}>
        <h1>User not Found</h1>
      </Flex>
    );
  }
  return (
    <>
      <UserHeader user={user} />
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={20}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!fetchingPosts && posts.length === 0 && (
        <h1 style={{ textAlign: "center", marginTop: 20 }}>User has no post</h1>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
}

export default UserPage;
