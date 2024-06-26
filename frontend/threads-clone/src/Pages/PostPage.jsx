import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import PostActions from "../Components/PostActions";
import Comment from '../Components/Comment';
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postAtom from "../atoms/postAtom";

function PostPage() {
  const currentUser=useRecoilValue(userAtom)
  const {user,loading}=useGetUserProfile();
  const [posts,setPosts]=useRecoilState(postAtom)
  const showToast=useShowToast();
  const {pid}=useParams();
  const navigate=useNavigate()
  const currentPost=posts[0]
  useEffect(()=>{
    const getPost=async()=>{
      try {
        const res=await fetch(`/api/posts/${pid}`);
        const data=await res.json();
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }
        console.log(data);
        setPosts([data]);
        
      } catch (error) {
        showToast("Error ",  error,'error');
      }
    }
    getPost();
  },[showToast,pid , setPosts])
  const handleDelete=async()=>{
    try {
      if(!window.confirm("Are you sure you want to delete this post?")) return;
      
      const res=await fetch(`/api/posts/${currentPost._id}`,{
        method:"DELETE",
      });
      const data=await res.json();
      if(data.error){
        showToast("Error",data.error,'error');
        return;
      }
      showToast("Success","Post delete successfully",'success');
      navigate(`/${user.username}`)
    } catch (error) {
      showToast("Error", error, "error");
    }
  }

  if(!user&&loading){
    return (
      <Flex justifyContent={'center'} my={20}>
        <Spinner size={'xl'}/>
      </Flex>
    )
  }
  if(!currentPost) return null;
  return (
    <>
    
      <Flex mt={20} >
        <Link to={`/${user.username}`}>
        <Flex w={"full"} alignItems={"center"} gap={3} >
          <Avatar src={user?.profilePic} size={"md"} name="markzuckerberg" />
          <Flex>
          
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user?.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} mt={1} />
          </Flex>
        </Flex>
        </Link>
        <Flex gap={4} alignItems={"center"} >
              <Text fontStyle={"sm"} fontSize={'xs'} width={36} textAlign={'right'} color={"gray.light"}>
                {/* {post.createdAt?formatDistanceToNow(new Date(post.createdAt:Date.now()):10 days ago)}  */}
                {currentPost.createdAt?(formatDistanceToNow(new Date(currentPost.createdAt))):'10 days'} ago
              </Text>
                {currentUser?._id===user?._id&&
                  <DeleteIcon size={20} onClick={handleDelete} cursor={'pointer'}/>
                }
            </Flex>
      </Flex>
      <Text my={10}>{currentPost?.text}</Text>
      {currentPost.img&&(
        <Box 
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={currentPost?.img} w={"full"} />
      </Box>
      )}
      <Flex gap={3} my={3}>
        <PostActions post={currentPost} />
      </Flex>
     
      <Divider my={4}/>

      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}>👏</Text>
          <Text color={'gray.light'}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>
          Get
        </Button>
      </Flex>
      <Divider my={4}/>
      {
        currentPost.replies.map((reply)=>(
          <Comment 
          key={reply._id}
          reply={reply}
          lastReply={reply._id===currentPost.replies[currentPost.replies.length-1]._id}
         /> 

        ))
      }
  
    </>
  );
}

export default PostPage;
