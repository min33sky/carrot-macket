import React from 'react';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import TextareaWithLabel from '../../components/TextareaWithLabel';

/**
 * 동네 생활 글쓰기
 * @returns
 */
function Write() {
  return (
    <Layout hasTabBar canGoBack title="동네생활 글쓰기">
      <form className="space-y-4 p-4">
        <TextareaWithLabel placeholder="Ask a question!" />
        <Button>Submit</Button>
      </form>
    </Layout>
  );
}

export default Write;
