import type { NextPage } from 'next';
import FloatingButton from '@components/FloatingButton';
import Item from '@components/Item';
import Layout from '@components/Layout';
import useUser from '@hooks/useUser';
import { useQuery } from 'react-query';
import { Product } from '@prisma/client';
import { getAllProducts } from '@libs/client/productApi';

export interface IAllProducts {
  success: boolean;
  products: IAllProductsWithLikes[];
}

interface IAllProductsWithLikes extends Product {
  _count: {
    favorites: number;
  };
}

const Home: NextPage = () => {
  const { data, isLoading } = useUser();
  const { data: productsData } = useQuery<IAllProducts, Error, IAllProducts>(
    'allProducts',
    getAllProducts
  );

  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {productsData?.products.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            comments={1577}
            hearts={product._count.favorites}
          />
        ))}

        <FloatingButton type="product" path="/products/upload" />
      </div>
    </Layout>
  );
};

export default Home;
