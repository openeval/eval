"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Home, Users } from "lucide-react";
import Link from "next/link";

const SideMenu = () => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger />
          <NavigationMenu.Content>
            <NavigationMenu.Link />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link href={"/assessments"}>
            <div className="flex flex-row items-center">
              <Home className="mr-2 h-4 w-4" /> Assessments
            </div>
          </Link>
          <NavigationMenu.Link />
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link href={"/candidates"}>
            <div className="my-2 flex flex-row items-center py-4">
              <Users className="mr-2 h-4 w-4" /> Candidates
            </div>
          </Link>
          <NavigationMenu.Link />
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger />
          <NavigationMenu.Content>
            <NavigationMenu.Sub>
              <NavigationMenu.List />
              <NavigationMenu.Viewport />
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator />
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
};

export default SideMenu;
