
'use server';

import { revalidatePath } from "next/cache";
import { threadModel } from "../models/threadModel";
import { userModel } from "../models/userModel";
import { mongooseConnect } from "../mongoose"

export const createThread = async ({ text, author, communityId, path }: { text: string, author: string, communityId: string | null, path: string }) => {


    try {
        mongooseConnect() // CREATING CONNECTION WITH OUR DATABASE!

        // NEW THREAD HAS BEEN CREATING!!
        const createdThread = await threadModel.create({
            text, author, community: null,
        });

        console.log(createdThread)

        // UPDATING USER MODEL THAT HAVING THREAD ARRAY && PUSHING THE ID OF NEW THREAD !!
        await userModel.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        });

        revalidatePath(path);
    } catch (err: any) {

    }

}

export const fetchThreads = async (pageNumber=1 , pageSize=20) => {

    try{
        mongooseConnect() // CREATING CONNECTION WITH OUR DATABASE!

        const skipAmount = (pageNumber-1) * pageSize;
        // TOP LEVEL THREADS !!!
        const postQuery = await threadModel.find({parentId:{$in:[null,undefined]}})
         .sort({createdAt: -1}).skip(skipAmount).limit(pageSize).populate({path:'author',model:userModel})
         .populate({path:'children',populate:{path:'author',model:userModel,select:"_id name parentId image"}})


         const totalPostCount = await threadModel.countDocuments({parentId:{$in:[null,undefined]}});

         const isNext = totalPostCount > skipAmount + postQuery.length

         return {posts:postQuery , isNext};

    } catch(err:any) {

    }


}

export const fetchThreadById = async(id:string) => {
    mongooseConnect();

    try{

        const thread = await threadModel.findById(id)
        .populate({path:'author',model:userModel}).populate({path:'children',populate:[{
            path:'author' , model:userModel , select:'_id id image name parentId'
        },{
            path:'children', model:threadModel , populate:{
                path:'author',model:userModel , select:'_id id image name parentId',
            }
        }]}).exec();

        return thread; 

    } catch (err:any) {
        console.log("ERROR: ", err.message);
    }

}



export default async function addCommentToThread(threadId:string, commentText:string, userId:string, path:string) {
    mongooseConnect();

    try{
        // FIND THREAD BY ID!
        const thread = await threadModel.findById(threadId);

        if(!thread) throw new Error('Thread Not Found!')

        // CREATES NEW THREAD WITH COMMENT TEXT!
        const newThread = new threadModel({
            text:commentText , 
            author:userId,
            parentId: threadId,
        });

        // SAVE THREAD TO DATABASE!
        const savedCommentThread = await newThread.save();

        thread.children.push(savedCommentThread);

        const updatedThread = await threadModel.findByIdAndUpdate(threadId, {
            $push: { children: savedCommentThread }
        });

        console.log("thread Updated: " ,updatedThread);

        revalidatePath(path);

    } catch(err:any) {
        console.log(`ERROR WHILE ADDING COMMENT TO THREAD: ${err.message}`);
    }

}