import React from "react";
import Error from "next/error";
import type { GetServerSideProps, NextPage } from "next";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const handleChange = async (e: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/presigned-url`)
  const S3DirectPost = await res.json()

  const file = e.target.files[0]
  console.log(file)

  const fields = S3DirectPost.fields
  const formData = new FormData()
  for (const key in fields) {
    formData.append(key, fields[key])
  }
  formData.append('file', file)

  const ret = await fetch(S3DirectPost.url, {
    method: 'POST',
    headers: { Accept: 'multipart/form-data' },
    body: formData,
  })
  const resText = await ret.text()
  const resXML = await parseXML(resText)
  const key = await resXML.getElementsByTagName('Key')[0].childNodes[0].nodeValue
}

const parseXML = (text: string) => new DOMParser().parseFromString(text, 'application/xml')


const Home: NextPage<Props> = (props, { statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <>
    <div className="bg-black">
      <h2>POSTの一覧</h2>
      {props.posts.map((post, id) => (
        <>
          <li key={id}>{post.id}</li>
          <li key={id}>{post.title}</li>
        </>
      ))}
    </div>
    <div>
      <input type="file" onChange={handleChange} />
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
