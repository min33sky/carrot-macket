import Link from 'next/link';
import React from 'react';
import FloatingButton from '../../components/FloatingButton';
import Layout from '../../components/Layout';

function Live() {
  return (
    <Layout hasTabBar title="라이브">
      <div className="space-y-4 divide-y-[1px] py-10">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Link key={i} href={`/live/${i}`}>
              <a className="block px-4 pt-4">
                <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
                <h1 className="mt-2 text-2xl font-bold text-gray-900">Galaxy S50</h1>
              </a>
            </Link>
          ))}

        <FloatingButton type="live" path="/live/create" />
      </div>
    </Layout>
  );
}

export default Live;
