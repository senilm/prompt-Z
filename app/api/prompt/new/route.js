import { connectToDB } from "@/utils/database"
import Prompt from "@/models/model"
import { revalidatePath } from "next/cache"
export const POST = async(req,res) =>{
    const {userId, prompt, tag} = await req.json()

    try {
        await connectToDB()
        const newPrompt = await Prompt.create({
            creator:userId,
            prompt,
            tag
        })
        
        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response("Failed to create a prompt",{status:500})
    }
}