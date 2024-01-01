'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Form from "@/components/Form"
import ProtectedRoute from "@/components/ProtectedRoute"
import { revalidatePath } from "next/cache"

const CreatePrompt = () => {
    const router = useRouter()
    const {data:session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const createPrompt = async (e) =>{
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/prompt/new',{
                method:'POST',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })
            })
            if (response.ok) {
                router.replace(router.asPath, undefined, { scroll: false });
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false)
        }
    }
  return (
    <ProtectedRoute>
        <Form type="Create" post = {post} setPost={setPost} submitting={submitting} handleSubmit = {createPrompt}/>
    </ProtectedRoute>
  )
}

export default CreatePrompt