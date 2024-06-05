import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <p>
        Please Login Here <Link href="/">home</Link>.
      </p>
    </div>
  );
}
