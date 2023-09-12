
import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";
import PostThread from '@/components/forms/PostThread';
import { fetchUser, fetchUsers } from '@/lib/actions/user.action';
import ProfileHeader from '@/components/shared/ProfileHeader';

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import Image from 'next/image';
import { profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';


export default async function page({ params }: { params: { id: string } }) {


    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(params.id); // FETCHING USER-DATA FROM FROM DATABASE/MONGODB !!

    // if (!userInfo?.onboarding) redirect('/onboarding')

    const users = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    });


    return (<>

        <section>
            <h1 className='head-text mb-10'>Search</h1>

            {/* <Searchbar routeType='search' /> */}

            <div className='mt-14 flex flex-col gap-9'>
                {users?.users?.length === 0 ? (
                    <p className='no-result'>No Result</p>
                ) : (
                    <>
                        {users?.users.map((p) => (
                            <UserCard
                                key={p?.id}
                                id={p?.id}
                                name={p?.name}
                                username={p?.username}
                                imgUrl={p?.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </div>

        </section>


    </>)
}