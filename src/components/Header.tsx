"use client";

import { Menu } from "lucide-react";
import type { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FeedbackButton } from "~/components/FeedbackButton";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/Sheet";
import { siteConfig } from "~/config/site";
import { SideNav } from "./SideNav";
import { UserAccountNav } from "./UserNav";

type HeaderProps = { user?: User; withMenu?: boolean };

const Header = ({ user, withMenu = true }: HeaderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95">
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
            <FeedbackButton />
            <div className="w-auto">
              <UserAccountNav user={user} />
            </div>
          </div>
        )}

        {withMenu && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Menu className="ml-2 cursor-pointer md:hidden" />
            </SheetTrigger>
            <SheetContent side={"right"}>
              <SideNav
                items={siteConfig.sidebarNav}
                onClickMenuItem={() => setIsOpen(false)}
              ></SideNav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Header;
