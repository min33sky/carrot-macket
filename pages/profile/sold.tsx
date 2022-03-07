import Layout from '@components/Layout';
import ProductsList from '@components/profile/ProductsList';
import React from 'react';

function Sold() {
  return (
    <Layout canGoBack title="판매 내역">
      <div className="flex flex-col space-y-5 py-10">
        <ProductsList kind="sales" />
      </div>
    </Layout>
  );
}

export default Sold;
