
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
