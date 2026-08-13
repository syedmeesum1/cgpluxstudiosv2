import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioItem } from "@/lib/sanity";
import SinglePortfolioClient from "@/components/SinglePortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio Item | CGplux Studios",
  description: "Explore our latest portfolio work.",
};

const fallbackItems = [
  {
    _id: "1",
    title: "Dream Glaze CGI Animation",
    slug: { current: "dream-glaze-cgi-animation" },
    excerpt: "The ultimate CGI animation showcase.",
    category: "3d-animation",
    image: undefined,
    content: null
  },
];

export default async function SinglePortfolioPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let item = await getPortfolioItem(params.slug).catch(() => null);

  if (!item) {
    const fallback = fallbackItems.find((p) => p.slug.current === params.slug);
    if (fallback) {
      item = fallback;
    } else {
      notFound();
    }
  }

  return <SinglePortfolioClient item={item} />;
}
