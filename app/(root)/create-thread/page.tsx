
import {currentUser} from '@clerk/nextjs';
import {redirect} from 'next/navigation';
import {fetchUser} from '@/lib/actions/user.action';
import PostThread from '@/components/forms/PostThread';


export default async function page() {


    const user = await currentUser(); // GETTING USER DATA FROM CLERK !!

    if(!user) return null; // NO USER CASE WILL RETURN NOTHING/NULL !!

    const userInfo = await fetchUser(user.id); // FETCHING USER-DATA FROM FROM DATABASE/MONGODB !!


    if(!userInfo?.onboarding) redirect('/onboarding')

    return(<>

    <h1 className="head-text">Create Thread</h1>

    <PostThread userId={userInfo._id} />
    
    
    </>)
} 