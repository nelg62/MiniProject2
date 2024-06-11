import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <p>
        Please Login To See More <Link href="/login">Login</Link>.
      </p>
    </div>
  );
}
