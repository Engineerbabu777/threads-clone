
import Link from 'next/link';
import '../globals.css';
import Image from 'next/image';
import { fetchThreads } from '@/lib/actions/threads.actions';
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';
import RootPage from '@/components/RootPage';

export default async function Home() {



   return (<>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        <RootPage />
      </section>

   </>)
} 