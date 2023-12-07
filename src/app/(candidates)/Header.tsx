import { FeedbackButton } from "~/components/FeedbackButton";
import { UserAccountNav } from "~/components/UserNav";
import { getCurrentUser } from "~/server/auth";

const Header = async () => {
  const user = await getCurrentUser();
  return (
    <header className="fixed z-10 w-full border-b border-b-slate-200  backdrop-blur-md dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        {user && (
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <FeedbackButton />
            <div className="w-auto">
              <UserAccountNav user={user} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
