"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
const MyProfile = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const {data:session} = useSession()
    const router = useRouter()

    useEffect(()=>{
        const fetchUserPrompts = async () =>{
            try {
                const response = await fetch(`/api/users/${session?.user.id}/posts`,{
                  method:'GET'
                })
                const data = await response.json()
                setPosts(data)
                setLoading(false)
            } catch (error) {
                console.log(error);   
            }
          }
        if(session?.user){
          fetchUserPrompts()
        }
    },[session])

    
    const handleEdit = async(post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete =async (post) =>{
      const response = await fetch(`/api/prompt/${post._id}`,{
        method:'DELETE'
      })
      if(response.ok){
        location.reload()
      }
    }
  return (
    <ProtectedRoute>
      <div>
      <Profile 
      name="My" 
      desc = "Welcome to your personalized Profile Page"
      data = {posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </div>
    </ProtectedRoute>
  );
};

export default MyProfile;
