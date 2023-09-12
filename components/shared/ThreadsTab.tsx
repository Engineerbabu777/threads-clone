import { fetchUserPosts } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


type Props = {
    currentUserId: string;
    accountId: string;
    accountType: string;
}


export default async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {

    let result = await fetchUserPosts(accountId);
    const user = await currentUser();

    console.log(result.threads)

    if (!result) redirect('/')

    return (<>

        <section className='mt-9 flex flex-col gap-10'>
            {result.threads.map((thread, ind) => (
                <article key={ind} className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="flex flex-col items-center">
                                <Link href={`/profile/${thread?.id}`} className="relative h-11 w-11">
                                    <Image src={user.imageUrl} width={'44'} height={'44'} className="rounded-full cursor-pointer" alt={"profile-image"} />
                                </Link>

                                <div className="thread-card_bar" />
                            </div>

                            <div className="flex w-full flex-col">
                                <Link href={`/profile/${thread?.id}`} className="w-fit">
                                    <h4 className="cursor-pointer text-base-semibold text-light-1">{thread?.author?.name}</h4>
                                </Link>

                                <p className={"mt-2 text-small-regular text-light-2"}>{thread?.text}</p>

                                <div className="mt-5 flex flex-col gap-3">
                                    <div className="flex gap-3.5">
                                        <Image src={"/assets/heart-gray.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                        <Link href={"/thread/" + thread?.id}>
                                            <Image src={"/assets/reply.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                        </Link>
                                        <Image src={"/assets/repost.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                        <Image src={"/assets/share.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                    </div>

                                    {/* {isComment && thread?.comments?.length > 0 && (<Link href={"/thread/"+thread?.id}>
                                  <p className="mt-1 text-subtle-medium text-gray-1">{thread?.comment?.length} replies</p>
                                </Link>)} */}

                                </div>
                            </div>

                        </div>
                    </div>
                </article>
            ))}
        </section>



    </>)
}