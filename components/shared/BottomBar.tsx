
'use client';

import {usePathname} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {sidebarLinks} from '@/constants/index';

export default function BottomBar() {

    const pathname = usePathname();

    return(<>
       <div className="bottombar">
        <div className="bottombar_container">

        {sidebarLinks.map((l: any, ind: any) => {
            const isActive = (pathname?.includes(l?.route) && l?.route.length > 1) || (pathname === l.route);

            return (<Link key={ind} className={"bottombar_link " + (isActive && "bg-primary-500")} href={l?.route}>
                <Image src={l?.imgURL} alt={l?.label} height={24} width={24} />
                <p className="text-subtle-medium text-light-1  max-sm:hidden">{l?.label.split(' ')[0]}</p>
            </Link>)
        })}

        </div>
       </div>    
    </>)
}