import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/sanity";
import SingleBlogClient from "@/components/SingleBlogClient";

export const metadata: Metadata = {
  title: "Blog Post | CGplux Studios",
  description: "Read the latest insights and updates from CGplux Studios.",
};

const fallbackPosts = [
  {
    _id: "1",
    title: "Asia's First Documented All-White RTX 5090 Build",
    slug: { current: "asias-first-all-white-rtx-5090-build" },
    excerpt: "The ultimate CG workstation by CGplux Studios - built for cinematic production and 3D rendering.",
    category: "Blog",
    publishedAt: "2025-05-28",
    image: undefined,
    content: null
  },
];

export default async function SingleBlogPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let post = await getBlogPost(params.slug).catch(() => null);

  if (!post) {
    const fallback = fallbackPosts.find((p) => p.slug.current === params.slug);
    if (fallback) {
      post = fallback;
    } else {
      notFound();
    }
  }

  return <SingleBlogClient post={post} />;
}
