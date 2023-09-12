
"use server";

import { revalidatePath } from "next/cache";
import { userModel } from "../models/userModel";
import { mongooseConnect } from "../mongoose";
import { threadModel } from "../models/threadModel";
import { FilterQuery, SortOrder } from "mongoose";


export const updateUser = async (
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
): Promise<void> => {
    mongooseConnect();

    try {

        console.log("Image:-> ", image)

        await userModel.findOneAndUpdate(
            { id: userId },
            { username: username.toLowerCase(), name, bio, image, path, onboarding: true },
            { upsert: true }
        );

        if (path === '/profile/edit') {
            revalidatePath(path);
        }

    } catch (err: any) {
        throw new Error(`Faild to create/update user with error: ${err.message}`)
    }

}


export const fetchUser = async (userId: string) => {
    mongooseConnect() // CREATING CONNECTION WITH OUR DATABASE!

    try {
        const user = await userModel.findOne({ id: userId })
        //  .populate({
        //     path:'communities',
        //     model:'community',
        //  });

        return user;


    } catch (err: any) {
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



export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {

    try {
        mongooseConnect();


        const skipAmount = (pageNumber - 1) * pageSize;     // Calculate the number of users to skip based on the page number and page size !!

        const regex = new RegExp(searchString, "i");  // Create a case-insensitive regular expression for the provided search string !!


        // Create an initial query object to filter users.
        const query: FilterQuery<typeof userModel> = {
            id: { $ne: userId }, // Exclude the current user from the results.
        };

        // If the search string is not empty, add the $or operator to match either username or name fields.
        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ];
        }

        // Define the sort options for the fetched users based on createdAt field and provided sort order.
        const sortOptions = { createdAt: sortBy };

        const usersQuery = userModel.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        // Count the total number of users that match the search criteria (without pagination).
        const totalUsersCount = await userModel.countDocuments(query);

        const users = await usersQuery.exec();

        // Check if there are more users beyond the current page.
        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };


    } catch (err: any) {

    }

}


export async function getActivity(userId: string) {
    try {
      mongooseConnect();
  
      // Find all threads created by the user
      const userThreads = await threadModel.find({ author: userId });
  
      // Collect all the child thread ids (replies) from the 'children' field of each user thread
      const childThreadIds = userThreads.reduce((acc:any, userThread:any) => {
        return acc.concat(userThread.children);
      }, []);
  
      // Find and return the child threads (replies) excluding the ones created by the same user
      const replies = await threadModel.find({
        _id: { $in: childThreadIds },
        author: { $ne: userId }, // Exclude threads authored by the same user
      }).populate({
        path: "author",
        model: userModel,
        select: "name image _id",
      });
  
      return replies;
    } catch (error) {
      console.error("Error fetching replies: ", error);
      throw error;
    }
  }