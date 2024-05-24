import Link from "next/link";

export default function About() {
  return (
    <div className="About">
      <h1>About</h1>
      <p>
        This is the about page. Nothing to see, go <Link href="/">home</Link>.
      </p>
    </div>
  );
}
