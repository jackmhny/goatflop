import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Sorry, the page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button size="lg">Go Back Home</Button>
        </Link>
      </div>
    </main>
  );
}