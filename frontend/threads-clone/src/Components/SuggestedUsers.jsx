import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";

function SuggestedUsers() {
  const [loading,setLoading]=useState(false)
  const [suggestedUsers,setSuggestedUser]=useState([])
  const showToast=useShowToast()
  
  useEffect(()=>{
     const getSuggestedUsers=async()=>{
      setLoading(true)
      try {
        const res=await fetch("/api/users/suggested");
        const data=await res.json();
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        }
        setSuggestedUser(data)
        
      } catch (error) {
        showToast("Error ",error,'error')
      }
      finally{
        setLoading(false)
      }
      
     }
     getSuggestedUsers()
  },[])
  return (

    <>
    
      <Text mb={4} fontWeight={"bold"}>
        Suggested User
      </Text>
      <Flex direction={"column"} gap={4}>
        {!loading && suggestedUsers.map((user)=><SuggestedUser key={user._id} user={user}/>)}
        {loading &&
          [0, 1, 2, 3, 4, 5].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={"1"}
              borderRadius={"md"}
            >
              {/* Avatar skeleton */}
              <Box>
                <SkeletonCircle size={"10"} />
              </Box>
              {/* username and fullname skeleyon */}
              <Flex w={"full"} flexDirection={"column"} gap={2}>
                <Skeleton h={"8px"} w={"80px"} />
                <Skeleton h={"8px"} w={"90px"} />
              </Flex>
              {/* follow button skeleton */}
              <Flex>
                <Skeleton h={"20px"} w={"60px"} />
              </Flex>
            </Flex>
          ))}
      </Flex>

    </>
  );
}

export default SuggestedUsers;
