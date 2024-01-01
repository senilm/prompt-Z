import { connectToDB } from "@/utils/database"
import Prompt from "@/models/model"
import { revalidatePath } from "next/cache"

export const DELETE = async (req,{params})=>{
    const {id} = params
    try {
        await connectToDB()
        const prompt = await Prompt.findByIdAndDelete(id)
        if(!prompt){
            return new Response(JSON.stringify("Error deleting file."),{status:400})
        }
        
        return new Response(JSON.stringify("Successfully deleted...!!"),{status:200})
    } catch (error) {
        return new Response(JSON.stringify("Error while deleting!!!"),{status:400})
    }finally{
        revalidatePath('/')
    }

}

export const PATCH = async (req,{params})=>{
    const {prompt, tag} = await req.json() 
    const {id} = params 
    try {
        await connectToDB()
       const existingPrompt = await Prompt.findByIdAndUpdate(id,{prompt,tag},{new:true})
       
       return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        return new Response("Error fetching prompts",{status:401})
    }  finally{
        revalidatePath('/')
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
        return new Response("Error fetching prompts",{status:401})
    }   
}