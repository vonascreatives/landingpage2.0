import { GetStaticProps } from "next";
import { getHomepageData, getAllPublishedPages } from "../lib/prismic-helpers";
import HomepageClient from "../components/homepage-client";

interface PageProps {
  homepageData: any;
  allPages: any[];
}

export default function HomePage({ homepageData, allPages }: PageProps) {
  return <HomepageClient homepageData={homepageData} allPages={allPages} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const homepageData = await getHomepageData();
  const allPages = await getAllPublishedPages();

  return {
    props: {
      homepageData,
      allPages,
    },
    revalidate: 60,
  };
};
