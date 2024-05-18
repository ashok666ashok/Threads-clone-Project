import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from './useShowToast';
import { useNavigate } from 'react-router-dom';
import authScreenAtom from '../atoms/authAtom';

function useLogout() {
  const setUser=useSetRecoilState(userAtom);
  const showToast=useShowToast()
  const navigate=useNavigate()
  const logout=async()=>{
    try {
        const res=await fetch("/api/users/logout",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        if(data.error){
            showToast("Error",data.error,'error');
            return; 
        }
        navigate('/')
        localStorage.removeItem('user-threads');
       
        setUser(null)
        
        
    } catch (error) {
        console.log(error)
    }
}
return logout;
    
}

export default useLogout