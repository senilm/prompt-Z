import Prompt from "@/models/model";
import { connectToDB } from "@/utils/database";


export const GET = async (req, { params }) => {
    await connectToDB();
    const { searchText } = params;
  
    try {
      // Using a case-insensitive regular expression for search
      const searchResults = await Prompt.find({
        tag: { $regex: new RegExp(`^#${searchText}$`, 'i') },
      }).populate('creator')
  
      if (!searchResults || searchResults.length === 0) {
        return new Response("No Posts with such tags!!!" , { status: 404 });
      }
  
      return new Response(JSON.stringify(searchResults), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error while fetching the Prompts", { status: 400 });
    }
  };