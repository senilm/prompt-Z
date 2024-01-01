'use client'

import { useSession } from "next-auth/react"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import Form from "@/components/Form"
import { useSearchParams } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"
import { revalidatePath } from "next/cache"

const UpdatePrompt = () => {
    const router = useRouter()
    const {data:session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    useEffect(()=>{
        const getPromptDetail = async () =>{
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        if(promptId)getPromptDetail()
    },[promptId])

    const updatePrompt = async (e) =>{
        e.preventDefault()
        setSubmitting(true)
        if(!promptId){
            alert('Missing Prompt ID')
        }
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag: post.tag,
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false)
            revalidatePath('/','page')
        }
        
    }
  return (
    <ProtectedRoute>
        <Form type="Edit" post = {post} setPost={setPost} submitting={submitting} handleSubmit = {updatePrompt}/>
    </ProtectedRoute>
  )
}

export default UpdatePrompt