

import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";
import PostThread from '@/components/forms/PostThread';
import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.action';
import ProfileHeader from '@/components/shared/ProfileHeader';

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import Image from 'next/image';
import { profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';
import Link from 'next/link';


export default async function page() {


    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user?.id); // FETCHING USER-DATA FROM FROM DATABASE/MONGODB !!

    const activity = await getActivity(userInfo?._id);

    console.log("activity -> ",activity)


    return (<>

        <h1 className='head-text'>Activity</h1>

        <section className='mt-10 flex flex-col gap-5'>
            {activity.length > 0 ? (
                <>
                    {activity.map((activity) => (
                        <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                            <article className='activity-card'>
                                <Image
                                    src={activity.author.image}
                                    alt='user_logo'
                                    width={20}
                                    height={20}
                                    className='rounded-full object-cover'
                                />
                                <p className='!text-small-regular text-light-1'>
                                    <span className='mr-1 text-primary-500'>
                                        {activity.author.name}
                                    </span>{" "}
                                    replied to your thread
                                </p>
                            </article>
                        </Link>
                    ))}
                </>
            ) : (
                <p className='!text-base-regular text-light-3'>No activity yet</p>
            )}
        </section>


    </>)
}