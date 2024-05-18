import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import PostActions from "./PostActions";
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNow} from'date-fns'
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postAtom from "../atoms/postAtom";


function Post({ post, postedBy , }) {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const currentUser=useRecoilValue(userAtom)
  const [posts,setPosts]=useRecoilState(postAtom)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
        // console.log(data)
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  const handleDelete=async(e)=>{
    try {
      e.preventDefault()
      if(!window.confirm("Are you sure you want to delete this post?")) return;

      const res=await fetch(`/api/posts/${post._id}`,{
        method:"DELETE",
      });
      const data=await res.json();
      if(data.error){
        showToast("Error",data.error,'error');
        return;
      }
      setPosts(posts.filter((p)=>p._id!==post._id))
      showToast("Success","Post delete successfully",'success');
      
    } catch (error) {
      showToast("Error", error, "error");
    }
  }
  return (
    <Link to={`/${user?.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5} mt={20}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user?.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
          />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name={post.replies[0].username}
                src={post.replies[0].profilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name={post.replies[1].username}
                src={post.replies[1].profilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name={post.replies[2].username}
                src={post.replies[2].profilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user?.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={2} mt={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} fontSize={'xs'} width={36} textAlign={'right'} color={"gray.light"}>
                {/* {post.createdAt?formatDistanceToNow(new Date(post.createdAt:Date.now()):10 days ago)}  */}
                {post.createdAt?(formatDistanceToNow(new Date(post.createdAt))):'10 days'} ago
              </Text>
                {currentUser?._id===user?._id&&
                  <DeleteIcon size={20} onClick={handleDelete}/>
                }
            </Flex>
          </Flex>
          <Text fontSize={"sm"}> {post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <PostActions post={post} />
          </Flex>
          
        </Flex>
      </Flex>
    </Link>
  );
}

export default Post;
