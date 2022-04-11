import Layout from '@components/Layout';
import { readdirSync } from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import React from 'react';

interface IPostProps {
  posts: {
    title: string;
    date: string;
    category: string;
    slug: string;
  }[];
}

function Blog({ posts }: IPostProps) {
  return (
    <Layout title="Blog">
      <h1 className="mt-5 mb-10 text-center text-xl font-semibold">Latest Posts:</h1>
      {posts.map((post, idx) => (
        <div key={idx} className="mb-5">
          <Link href={`/blog/${post.slug}`}>
            <a>
              <span className="text-lg text-red-400">{post.title}</span>
              <div>
                <span>
                  {post.date} / {post.category}
                </span>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  );
}

export default Blog;

export async function getStaticProps() {
  //! Next가 pages와 posts 디렉토리를 같은 레벨로 보기 때문에 '../posts'은 에러 발생
  const blogPosts = readdirSync('./posts').map((file) => {
    const [slug, _] = file.split('.');
    return { ...matter.read(`./posts/${file}`).data, slug };
  });

  return {
    props: {
      posts: blogPosts.reverse(),
    },
  };
}
