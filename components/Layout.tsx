import { ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-white border-b border-gray-300">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Next Blog</h1>
          <div>
            {session ? (
              <>
                <span className="mr-4 text-gray-800">Welcome, {session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login"className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
                    Login
                  
                </Link>
                <Link href="/signup"className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Sign Up
                  
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto py-8 px-6">
        {children}
      </main>
    </div>
  );
}
