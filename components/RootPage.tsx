

import { fetchThreads } from '@/lib/actions/threads.actions';
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';
import Link from 'next/link';
import Image from 'next/image';



export default async function RootPage() {

    const posts = await fetchThreads(1, 30);
    const user = await currentUser();

    const isComment = false;


    return (<>

        {posts?.posts?.length === 0 ? (<><p className="no-result">No threads found</p></>) : (<>
            {(posts?.posts?.length > 0) && posts?.posts?.map((post: any, ind: any) => (
                <>
                    {console.log(post)}
                    <article key={ind} className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-1 gap-4">
                                <div className="flex flex-col items-center">
                                    <Link href={`/profile/${post?.author?.id}`} className="relative h-11 w-11">
                                        <Image src={post?.author?.image} width={'44'} height={'44'} className="rounded-full cursor-pointer" alt={"profile-image"} />
                                    </Link>

                                    <div className="thread-card_bar" />
                                </div>

                                <div className="flex w-full flex-col">
                                    <Link href={`/profile/${post?.author?.id}`} className="w-fit">
                                        <h4 className="cursor-pointer text-base-semibold text-light-1">{post?.author?.name}</h4>
                                    </Link>

                                    <p className={"mt-2 text-small-regular text-light-2"}>{post?.text}</p>

                                    <div className="mt-5 flex flex-col gap-3">
                                        <div className="flex gap-3.5">
                                            <Image src={"/assets/heart-gray.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text"/>
                                            <Link href={"/thread/"+post?.id}>
                                            <Image src={"/assets/reply.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text"/>
                                            </Link>
                                            <Image src={"/assets/repost.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text"/>
                                            <Image src={"/assets/share.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text"/>
                                        </div>

                                        {isComment && post?.comments?.length > 0 && (<Link href={"/thread/"+post?.id}>
                                          <p className="mt-1 text-subtle-medium text-gray-1">{post?.comment?.length} replies</p>
                                        </Link>)}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </article>
                </>
            ))}</>)}


    </>)
}
