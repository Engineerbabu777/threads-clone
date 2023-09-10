

import { fetchThreads } from '@/lib/actions/threads.actions';
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';
import Link from 'next/link';
import Image from 'next/image';



export default async function RootPage() {

    const posts = await fetchThreads(1, 30);
    const user = await currentUser();


    return (<>

        {posts?.posts?.length === 0 ? (<><p className="no-result">No threads found</p></>) : (<>
            {(posts?.posts?.length > 0) && posts.posts.map((post: any, ind: any) => (
                <>
                {console.log(post)}
                    <article key={ind} className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-1 gap-4">
                                <div className="flex flex-col items-center">
                                    <Link href={`/profile/${post?.author?.id}`} className="relative h-11 w-11">
                                        <Image src={post?.author?.image} width={'44'} height={'44'} className="rounded-full cursor-pointer" alt={"profile-image"} />
                                    </Link>

                                    <div className="thread-card_bar"/>

                                </div>
                            </div>
                        </div>
                        <h2 className="text-light-2 text-small-regular">{post?.text}</h2>
                    </article>
                </>
            ))}</>)}


    </>)
}
