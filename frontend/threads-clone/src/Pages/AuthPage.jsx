import React from 'react'
import SignupCard from '../Components/SignupCard'
import LoginCard from '../Components/LoginCard'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import userAtom from '../atoms/userAtom'

function AuthPage() {
    const authScreenState=useRecoilValue(authScreenAtom);
    const user =useRecoilValue(userAtom)
    // console.log(authScreenState)
  return (
    <>
    {
        authScreenState==="login"?
        <LoginCard/>:<SignupCard/>
           
    }
    
    
        
    </>
  )
}

export default AuthPage