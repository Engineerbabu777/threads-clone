
import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";
import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.action';
import ProfileHeader from '@/components/shared/ProfileHeader';

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import Image from 'next/image';
import { profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';

export default async function page({ params }: { params: { id: string } }) {


    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(params.id); // FETCHING USER-DATA FROM FROM DATABASE/MONGODB !!

    if (!userInfo?.onboarding) redirect('/onboarding')



    return(<>
    
    
    </>)
}