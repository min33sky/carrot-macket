import Layout from '@components/Layout';
import { readdirSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import React from 'react';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import { unified } from 'unified';

function Post({ post, data }: { post: string; data: any }) {
  return (
    <Layout title={data.title}>
      <div
        className="prose prose-h1:text-blue-500 hover:prose-h1:text-blue-800 md:prose-lg"
        dangerouslySetInnerHTML={{ __html: post }}
      ></div>
    </Layout>
  );
}

export default Post;

/**
 *! 에러 해결
 *! Error: getStaticPaths is required for dynamic SSG pages and is missing for '/blog/[slug]'.
 *? 동적 페이지와 달리 정적 페이지는 빌드할 때 총 몇개의 페이지가 필요한 지 알아야 한다.
 *? -> getStaticPaths: 동적 URL을 갖는 정적 페이지를 만들 때 필요하다.
 *! Error: Error: The provided path `01-first-post` does not match the page: `/blog/[slug]`.
 *? -> URL 파라미터가 매칭이 안되어서 발생하는 에러
 *? -> { params: {slug}} 형식의 객체 배열을 리턴해주자 ([slug].tsx의 변수가 slug 이므로)
 */

export function getStaticPaths() {
  const files = readdirSync('./posts').map((file) => {
    const [name, extention] = file.split('.');
    return { params: { slug: name } };
  });

  return {
    paths: files, // 정적 페이지를 만들 파일들의 위치
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);

  return {
    props: {
      post: value,
      data,
    },
  };
};
