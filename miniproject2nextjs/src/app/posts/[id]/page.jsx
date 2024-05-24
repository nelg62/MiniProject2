import Link from "next/link";

async function getPostData(id) {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/" + "posts/" + id
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post #" + id);
  }
  return res.json();
}

export default async function Post({ params }) {
  const post = await getPostData(params.id);
  return (
    <>
      <div className="post">
        {post ? (
          <>
            <h3>
              Post #{post.id}: {post.title}
            </h3>
            <p>{post.body}</p>
          </>
        ) : (
          "Loading ..."
        )}
      </div>
      <Link href="/posts">All Posts</Link>
    </>
  );
}
