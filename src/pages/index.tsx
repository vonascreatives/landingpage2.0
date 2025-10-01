import { GetStaticProps } from "next";
import { getHomepageData } from "../lib/prismic-helpers";
import HomepageClient from "../components/homepage-client";

interface PageProps {
  homepageData: any;
}

export default function HomePage({ homepageData }: PageProps) {
  return <HomepageClient homepageData={homepageData} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const homepageData = await getHomepageData();

  return {
    props: {
      homepageData,
    },
    revalidate: 60, 
  };
};
