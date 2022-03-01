import type { NextPage } from 'next';
import FloatingButton from '@components/FloatingButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@hooks/useUser';

const Home: NextPage = () => {
  const { data, isLoading } = useUser();

  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Item key={i} id={i} title="아이폰24" price={95} comments={2633} hearts={1577} />
          ))}

        <FloatingButton type="item" path="/products/upload" />
      </div>
    </Layout>
  );
};

export default Home;
