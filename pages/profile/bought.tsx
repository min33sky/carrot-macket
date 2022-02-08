import React from 'react';
import Item from '../../components/Item';
import Layout from '../../components/Layout';

function Bought() {
  return (
    <Layout canGoBack title="구매 내역">
      <div className="flex flex-col space-y-5 divide-y pb-10">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Item key={i} id={i} title="Macbook Pro" price={213} comments={1577} hearts={2633} />
          ))}
      </div>
    </Layout>
  );
}

export default Bought;
