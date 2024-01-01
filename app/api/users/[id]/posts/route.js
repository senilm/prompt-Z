import { connectToDB } from "@/utils/database"
import Prompt from "@/models/model"

export const GET = async (req,{params}) =>{
    const {id} = params
    await connectToDB()
    try {
       const prompts = await Prompt.find({creator:id}).populate('creator')
       if(!prompts){
        return new Response("No Prompts Found",{status:400})
       }
       return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response("Error fetching prompts",{status:401})
    }
}   