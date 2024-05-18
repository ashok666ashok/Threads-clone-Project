import React, { useState } from 'react'
import useShowToast from './useShowToast';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

function useFollowUnfollow(user) {
    const currentUser = useRecoilValue(userAtom);
	const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
	const [updating, setUpdating] = useState(false);
	const showToast = useShowToast();
    const handleFollowUnfollow = async () => {
        if (!currentUser) {
          showToast("Error", "Please login to follow", "error");
          return;
        }
        if (updating) return;
        setUpdating(true);
        try {
          const res = await fetch(`/api/users/follow/${user._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (data.error) {
            showToast("Error", data.error, "error");
          }
          if (following) {
            showToast("success", `Unfollow ${user.name}`, "success");
            user.followers.pop(); //removing followers
          } else {
            showToast("success", `Follow ${user.name}`, "success");
            user.followers.push(currentUser?._id); //adding followers
          }
          setFollowing(!following);
          // console.log(data);
        } catch (error) {
          showToast("Error", error, "error");
        } finally {
          setUpdating(false);
        }
      };
  return {handleFollowUnfollow,updating,following}
}

export  default useFollowUnfollow;