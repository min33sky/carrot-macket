import Layout from '@components/Layout';
import ProductsList from '@components/profile/ProductsList';
import React from 'react';

function Loved() {
  return (
    <Layout canGoBack title="관심 목록">
      <div className="flex flex-col space-y-5 py-10">
        <ProductsList kind="favorites" />
      </div>
    </Layout>
  );
}

export default Loved;
