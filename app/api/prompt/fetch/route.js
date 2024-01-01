import { connectToDB } from "@/utils/database"
import Prompt from "@/models/model"

export const GET = async (req,res) =>{
    await connectToDB()
    try {
       const prompts = await Prompt.find({}).populate('creator')
       if(!prompts){
        return new Response("No Prompts Found",{status:400})
       }
       revalidatePath('/','page')
       return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response("Error fetching prompts",{status:401})
    }
}   