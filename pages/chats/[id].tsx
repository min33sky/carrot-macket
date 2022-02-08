import React from 'react';
import Message from '../../components/chats/Message';
import Layout from '../../components/Layout';

function CharDetail() {
  return (
    <Layout canGoBack title="XXX님과 대화중">
      <div className="space-y-4 py-10 px-4 pb-16">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              {i % 2 === 0 ? <Message message="하이요" /> : <Message message="오냐" reversed />}
            </div>
          ))}

        <form className="fixed inset-x-0 bottom-0 bg-white py-2">
          <div className="relative mx-auto flex w-full max-w-md items-center">
            <input
              type="text"
              className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />

            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CharDetail;
