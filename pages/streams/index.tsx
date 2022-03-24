import React, { useEffect } from 'react';
import FloatingButton from '@components/FloatingButton';
import Layout from '@components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { Stream } from '@prisma/client';
import { useInView } from 'react-intersection-observer';

interface IStreamsResponse {
  success: boolean;
  streams: Stream[];
  nextId: number | undefined;
}

export async function getStreams(pageParam: string = '') {
  await new Promise((res) => setTimeout(res, 1000)); //! 로딩 딜레이 테스트용으로 사용 (제거해야함!!!)
  const { data } = await axios.get(`/api/streams?cursor=${pageParam}`);
  return data;
}

function Streams() {
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IStreamsResponse,
    Error
  >('streams', ({ pageParam }) => getStreams(pageParam), {
    getNextPageParam: (lastPage) => lastPage.nextId ?? false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <Layout hasTabBar title="라이브">
      <div className="space-y-4 divide-y-[1px] py-10">
        {data?.pages.map((page) => (
          <React.Fragment key={page.nextId ?? 'lastPage'}>
            {page.streams.map((stream) => (
              <Link key={stream.id} href={`/streams/${stream.id}`}>
                <a className="block px-4 pt-4">
                  <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
                  <h1 className="mt-2 text-2xl font-bold text-gray-900">{stream.name}</h1>
                </a>
              </Link>
            ))}
          </React.Fragment>
        ))}

        {isFetchingNextPage ? <div className="loading">Loading...</div> : null}

        <span style={{ visibility: 'hidden' }} ref={ref}>
          intersection observer marker
        </span>

        {/* 방송 생성 버튼 */}
        <FloatingButton type="stream" path="/streams/create" />
      </div>
    </Layout>
  );
}

export default Streams;
