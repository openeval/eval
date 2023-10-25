import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "~/server/auth";
import { UserAccountNav } from "./UserNav";

const Header = async () => {
  const user = await getCurrentUser();
  return (
    <header className="fixed z-10 w-full border-b border-b-slate-200  backdrop-blur-md dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        <div className="flex">
          <Link href="/" className="h-12 w-32">
            <Image
              src="/logo.svg"
              alt="logo"
              priority
              width={170}
              height={90}
            />
          </Link>
        </div>

        {user && (
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <div className="w-auto ">
              <UserAccountNav user={user} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
