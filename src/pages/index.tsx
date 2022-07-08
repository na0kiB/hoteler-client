import React from "react";
import Error from "next/error";
import type { GetServerSideProps, NextPage } from "next";
import onUploadImage from "";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

// const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/v1/presigned-url`
//   );
//   const S3DirectPost = await res.json();
//   if (!event.target.files) return;
//   const file = event.target.files[0];

//   const fields = S3DirectPost.fields;
//   const formData = new FormData();
//   for (const key in fields) {
//     formData.append(key, fields[key]);
//   }
//   formData.append("file", file);

//   const ret = await fetch(S3DirectPost.url, {
//     method: "POST",
//     headers: {
//       Accept: "multipart/form-data",
//     },
//     body: formData,
//   });
//   console.log(S3DirectPost.url);
//   // https://hoteler-image.s3.ap-northeast-1.amazonaws.com
//   const resText = await ret.text();
//   console.log(resText);
//   const resXML = await parseXML(resText);
//   console.log(resXML);
//   const key = await resXML.getElementsByTagName("Key")[0].childNodes[0]
//     .nodeValue;
//   console.log(key);
// };

// const parseXML = (text: string) =>
//   new DOMParser().parseFromString(text, "application/xml");

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
        <input type="file" onChange={onUploadImage} />
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
