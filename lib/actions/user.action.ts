
"use server";

import { revalidatePath } from "next/cache";
import { userModel } from "../models/userModel";
import { mongooseConnect } from "../mongoose";


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
