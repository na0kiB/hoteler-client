import React from "react";
import Error from "next/error";
import type { GetServerSideProps, NextPage } from "next";

import OnUploadImage from "components/s3ByForm";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = (props, { statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <>
      <div className="bg-black">
        <h2>POSTの一覧</h2>
        {props.posts.map((post, index) => (
          <div key={index}>
            <li>{post.id}</li>
            <li>{post.title}</li>
          </div>
        ))}
      </div>
      <div>
        <OnUploadImage />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const json = await res.json();
  return {
    props: {
      posts: json.posts,
    },
  };
};
export default Home;
