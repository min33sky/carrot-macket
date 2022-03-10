import React from 'react';
import FloatingButton from '@components/FloatingButton';
import Layout from '@components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Stream } from '@prisma/client';

interface IStreamsResponse {
  success: boolean;
  streams: Stream[];
}

export async function getStreams() {
  const { data } = await axios.get('/api/streams');
  return data;
}

function Streams() {
  const { data } = useQuery<IStreamsResponse, Error>('streams', getStreams);

  return (
    <Layout hasTabBar title="라이브">
      <div className="space-y-4 divide-y-[1px] py-10">
        {data?.streams.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a className="block px-4 pt-4">
              <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
              <h1 className="mt-2 text-2xl font-bold text-gray-900">{stream.name}</h1>
            </a>
          </Link>
        ))}

        <FloatingButton type="stream" path="/streams/create" />
      </div>
    </Layout>
  );
}

export default Streams;
