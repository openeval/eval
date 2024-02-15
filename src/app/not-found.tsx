import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="grid h-screen place-content-center">
      <div className="container mx-auto max-w-md text-center">
        <h1 className="my-4 text-4xl font-bold text-muted-foreground">
          404 - Page Not Found
        </h1>
        <p className="text-zinc-400">
          We could not find the page you are looking for.
        </p>
        <div className="my-4 border border-b-gray-50"></div>
        <div>
          <Link
            className="text-primary hover:text-primary/50 hover:underline"
            href="/"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Custom404;
