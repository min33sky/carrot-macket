import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from 'react-query';

// https://api.spacexdata.com/v4/launches/latest

type SpaceXData = {
  name: string;
  links: {
    patch: {
      large: string;
    };
  };
};

const getSpaceXData = async () =>
  await (await fetch('https://api.spacexdata.com/v4/launches/latest')).json();

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<SpaceXData>('spacex', getSpaceXData);

  console.log(isLoading);

  if (isLoading) return <div>Loading....</div>;
  if (!data) return <div>No Data!</div>;

  return (
    <div>
      <Head>
        <title>SSR 연습</title>
      </Head>
      <h2>{data?.name}</h2>
      <Image src={data?.links.patch.large} alt="patch-image" width={500} height={500} />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('spacex', getSpaceXData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
