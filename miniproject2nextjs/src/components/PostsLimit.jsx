"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function PostsLimit(defaultLimit) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const limit = searchParams.has("limit")
    ? searchParams.get("limit")
    : defaultLimit;
  const handleChangeLimit = (e) => {
    router.replace(pathname + "?limit=" + e.target.value);
  };
  return (
    <label className="PostsLimit">
      Number of posts:
      <select onChange={handleChangeLimit} value={limit}>
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    </label>
  );
}
