import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";






export default async function Page({params}:{params:{id:string}}) {


    if(!params?.id) return null;

    const user:any = await currentUser();

    const userInfo  =await fetchUser(user?.id);

    if(!userInfo?.onboarding) redirect('/onboarding')

    // const thread = await fetchThreadById(params?.id);

    return(<>
    <section className="relative">


    </section>
    
    </>)
}