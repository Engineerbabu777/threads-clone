import Image from "next/image";
import Link from "next/link";
import {SignedIn , SignOutButton,OrganizationSwitcher} from '@clerk/nextjs'





export default function TopBar() {


    return(<>
    <div className="topbar">
      <Link href="/" className="flex items-center gap-4" >
         <Image src={"/logo.svg"} alt={"logo"} width={28} height={28} />
         <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src={'/assets/logout.svg'} alt={"logout"} height={28} width={28}/>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher appearance={{elements:{OrganizationSwitcher:'py-2 px-2'}}}/>

      </div>
      
    </div>
      
    </>)
}