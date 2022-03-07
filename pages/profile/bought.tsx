import Layout from '@components/Layout';
import ProductsList from '@components/profile/ProductsList';
import React from 'react';

function Bought() {
  return (
    <Layout canGoBack title="구매 내역">
      <div className="flex flex-col space-y-5 py-10">
        <ProductsList kind="purchases" />
      </div>
    </Layout>
  );
}

export default Bought;
