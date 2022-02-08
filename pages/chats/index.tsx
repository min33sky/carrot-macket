import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';

function Chat() {
  return (
    <Layout canGoBack hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Link key={i} href={`/chats/${i}`}>
              <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                <div className="h-12 w-12 rounded-full bg-slate-300" />
                <div>
                  <p className="text-gray-700">Steve Jebs</p>
                  <p className="text-sm  text-gray-500">See you tomorrow in the corner at 2pm!</p>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
}

export default Chat;
