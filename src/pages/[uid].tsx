import { GetStaticPaths, GetStaticProps } from "next";
import * as prismic from "@prismicio/client";
import BrandPageClient from "../components/brand-page-client";

interface BrandPageProps {
  pageData: any;
}

export default function BrandPage({ pageData }: BrandPageProps) {
  return <BrandPageClient pageData={pageData} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return empty paths and use fallback: "blocking" for on-demand generation
  // This allows any UID to be tried without pre-generating all paths
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params?.uid as string;

  if (!uid) {
    return {
      notFound: true,
    };
  }

  // Since all brand pages are type "homepage" with UIDs, fetch by UID
  // Create client without routes to avoid link resolution errors
  const client = prismic.createClient(
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || "airtable-pages",
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  try {
    const pageData = await client.getByUID("homepage", uid);

    return {
      props: {
        pageData,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.warn(`Page with UID "${uid}" not found:`, error);
    return {
      notFound: true,
    };
  }
};
