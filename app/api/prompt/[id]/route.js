import { connectToDB } from "@/utils/database"
import Prompt from "@/models/model"
import { revalidatePath } from "next/cache"

export const DELETE = async (req,{params})=>{
    const {id} = params
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(id)
        return new Response("Successfully deleted...!!",{status:200})
    } catch (error) {
        return new Response("Error while deleting!!!",{status:400})
    }

}

export const PATCH = async (req,{params})=>{
    const {prompt, tag} = await req.json() 
    const {id} = params 
    try {
        await connectToDB()
       const existingPrompt = await Prompt.findByIdAndUpdate(id,{prompt,tag},{new:true})
       
       return new Response("successfully updated Prompt",{status:200})
    } catch (error) {
        return new Response("Error fetching prompts",{status:401})
    }  
    
}

export const GET = async (req,{params})=>{
    const {id} = params
    try {
        await connectToDB()
       const prompt = await Prompt.findById(id).populate('creator')
       if(!prompt){
        return new Response("Prompt Not Found",{status:404})
       }
       return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Internal server error",{status:500})
    }   
}