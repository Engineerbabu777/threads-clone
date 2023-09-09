
import Link from 'next/link';
import '../globals.css';
import Image from 'next/image';
import { fetchThreads } from '@/lib/actions/threads.actions';
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';

export default async function Home() {

   const posts = await fetchThreads(1, 30);
   const user = await currentUser();

   console.log(posts)

  return (<>
  <h1 className="head-text text-left">Home</h1>

  <section className="mt-9 flex flex-col gap-10">
     {posts?.posts?.length === 0 ? (<>
        <p className="no-result">No threads found</p>
     </>) :(<>
       {posts?.posts.map((post:any , ind:number) => (
        <ThreadCard 
         key={ind}
         id={post?._id}
         currentUser={user?.id || ""}
         parentId={post?.parentId}
         content={post?.text}
         author={post?.author}
         community={post?.community}
         createdAt={post?.createdAt}
         comments={posts?.children}
        />
       ))}
     </>)}
  </section>
  
  
  </>  )
} 