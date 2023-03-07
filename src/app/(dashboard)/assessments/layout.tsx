import "~/styles/globals.css";
import Header from "~/components/Header";
import SideMenu from "~/components/SideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex overflow-hidden border-t border-transparent pt-16">
        <aside
          id="sidebar"
          className="transition-width fixed top-0 left-0 z-20 hidden h-full w-64 flex-shrink-0 flex-col pt-16 font-normal duration-75 lg:flex"
          aria-label="Sidebar"
        >
          <div className="container mt-8">
            <SideMenu />
          </div>
        </aside>
        <main
          id="main-content"
          className="container relative h-full w-full overflow-y-auto py-8 lg:ml-64"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
