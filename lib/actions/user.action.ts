
"use server";

import { revalidatePath } from "next/cache";
import { userModel } from "../models/userModel";
import { mongooseConnect } from "../mongoose";
import { threadModel } from "../models/threadModel";


export const updateUser = async(
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
):Promise<void> => {
    mongooseConnect();

    try{

        console.log("Image:-> ", image)

        await userModel.findOneAndUpdate(
            {id:userId},
            {username:username.toLowerCase(),name,bio,image,path,onboarding:true},
            {upsert:true}
        );
    
        if(path === '/profile/edit'){
            revalidatePath(path);
        }

    } catch(err:any) {
        throw new Error(`Faild to create/update user with error: ${err.message}`)
    }

}


export const fetchUser = async(userId:string) => {
    mongooseConnect() // CREATING CONNECTION WITH OUR DATABASE!

    try{
        const user = await userModel.findOne({id:userId})
        //  .populate({
        //     path:'communities',
        //     model:'community',
        //  });

        return user;


    } catch(err:any) {
        throw new Error(`Failed to fetch user with error: ${err.message}`)
          
    }

}


export async function fetchUserPosts(userId: string) {
    try {
      mongooseConnect();
  
      // Find all threads authored by the user with the given userId
      const threads = await userModel.findOne({ id: userId }).populate({
        path: "threads",
        model: threadModel,
        populate: [
          {
            path: "children",
            model: threadModel,
            populate: {
              path: "author",
              model: userModel,
              select: "name image id", // Select the "name" and "_id" fields from the "User" model
            },
          },
        ],
      });
      return threads;
    } catch (error) {
      console.error("Error fetching user threads:", error);
      throw error;
    }
  }
  