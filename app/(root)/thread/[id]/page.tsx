import { fetchThreadById } from "@/lib/actions/threads.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import Comment from "@/components/forms/Comment";






export default async function Page({ params }: { params: { id: string } }) {


    if (!params?.id) return null;

    const user: any = await currentUser();

    const userInfo = await fetchUser(user?.id);

    let isComment = false;

    if (!userInfo?.onboarding) redirect('/onboarding')

    const thread = await fetchThreadById(params?.id);

    return (<>
        {thread && (
            <section className="relative">
                <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="flex flex-col items-center">
                                <Link href={`/profile/${thread?.id}`} className="relative h-11 w-11">
                                    <Image src={thread?.author?.image} width={'44'} height={'44'} className="rounded-full cursor-pointer" alt={"profile-image"} />
                                </Link>

                                <div className="thread-card_bar" />
                            </div>

                            <div className="flex w-full flex-col">
                                <Link href={`/profile/${thread?.author?.id}`} className="w-fit">
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

                                    {isComment && thread?.comments?.length > 0 && (<Link href={"/thread/" + thread?.id}>
                                        <p className="mt-1 text-subtle-medium text-gray-1">{thread?.comments?.length} replies</p>
                                    </Link>)}

                                </div>
                            </div>

                        </div>
                    </div>
                </article>

                <div className="mt-7 ">
                    <Comment threadId={thread.id} currentUserId={JSON.stringify(userInfo?._id)} currentUserImg={user?.imageUrl} />
                </div>

                <div className="mt-10">
                    {thread?.children?.length > 0 && thread?.children?.map((comment: any, ind: any) => (<>
                        <article className="flex w-full flex-col rounded-xl px-0 xs:px-7" key={ind}>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-1 gap-4">
                                    <div className="flex flex-col items-center">
                                        <Link href={`/profile/${comment?.id}`} className="relative h-11 w-11">
                                            <Image src={comment?.author?.image} width={'44'} height={'44'} className="rounded-full cursor-pointer" alt={"profile-image"} />
                                        </Link>

                                        <div className="thread-card_bar" />
                                    </div>

                                    <div className="flex w-full flex-col">
                                        <Link href={`/profile/${comment?.author?.id}`} className="w-fit">
                                            <h4 className="cursor-pointer text-base-semibold text-light-1">{comment?.author?.name}</h4>
                                        </Link>

                                        <p className={"mt-2 text-small-regular text-light-2"}>{comment?.text}</p>

                                        <div className="mt-5 flex flex-col gap-3">
                                            <div className="flex gap-3.5">
                                                <Image src={"/assets/heart-gray.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                                <Link href={"/thread/" + comment?.id}>
                                                    <Image src={"/assets/reply.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                                </Link>
                                                <Image src={"/assets/repost.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                                <Image src={"/assets/share.svg"} className="cursor-pointer object-contain" height={24} width={24} alt="alt-text" />
                                            </div>

                                            {true && thread?.comments?.length > 0 && (<Link href={"/thread/" + comment?.id}>
                                                <p className="mt-1 text-subtle-medium text-gray-1">{comment?.comments?.length} replies</p>
                                            </Link>)}

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </article>

                    </>))}

                </div>

            </section>
        )}
    </>)
}