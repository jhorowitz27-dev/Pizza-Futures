import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-surface border-b border-[#333] flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-accent">
        PizzaFutures
      </Link>
      <nav className="flex gap-6 text-textSecondary">
        <Link href="/predict">Predict</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
