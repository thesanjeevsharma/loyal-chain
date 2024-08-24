import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white mb-4">LoyalChain</h1>
      <p className="mb-10">
        Join NFT based loyalty programmes at your favorite places.
      </p>
      <Link href="/login">
        <button className="btn btn-secondary text-white mb-4">
          Start as User 🧍‍♂️ (recommended)
        </button>
      </Link>
      <Link href="/rewards">
        <button className="btn text-white">Start as Organization 🏤</button>
      </Link>
    </main>
  );
}
