

'use client';

import Link from 'next/link';
import { sidebarLinks } from '../../constants/index';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {  SignedIn, SignOutButton ,useAuth} from '@clerk/nextjs';
import {useState} from 'react';

export default function LeftSideBar() {

    const router = useRouter();
    const pathname = usePathname();
    const {userId} = useAuth();
    


    return (<>
        <section className="custom-scrollbar leftsidebar ">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((l: any, ind: any) => {
                    const isActive = (pathname?.includes(l?.route) && l?.route.length > 1) || (pathname === l.route);

                    return (<Link key={ind} className={"leftsidebar_link " + (isActive && "bg-primary-500")} href={l?.route==='/profile'? (`${l?.route}/${userId}`) : (l?.route)}>
                        <Image src={l?.imgURL} alt={l?.label} height={24} width={24} />
                        <p className="text-light-1 max-lg:hidden">{l?.label}</p>
                    </Link>)
                })}
            </div>

            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                        <div className="flex cursor-pointer ga-4 p-4">
                            <Image src={'/assets/logout.svg'} alt={"logout"} height={28} width={28} />
                            <p className="text-light-2 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>

    </>)
}