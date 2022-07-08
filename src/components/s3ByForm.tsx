import React from "react";

const onUpdaloadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/presigned-url`
  );
  const S3DirectPost = await res.json();
  if (!event.target.files) return;
  const file: File = event.target.files[0];

  const fields = S3DirectPost.fields;
  const formData = new FormData();
  for (const key in fields) {
    formData.append(key, fields[key]);
  }
  formData.append("file", file);

  const ret = await fetch(S3DirectPost.url, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
    },
    body: formData,
  });
  console.log(S3DirectPost.url);
  // https://hoteler-image.s3.ap-northeast-1.amazonaws.com
  const resText = await ret.text();
  console.log(resText);
  const resXML = await parseXML(resText);
  console.log(resXML);
  const key = await resXML.getElementsByTagName("Key")[0].childNodes[0]
    .nodeValue;
  console.log(key);
  // return (
  //   <>
  //     <input type="file" onChange={onUpdaloadImage} />
  //   </>
  // );
};
const parseXML = (text: string) =>
  new DOMParser().parseFromString(text, "application/xml");

export default onUpdaloadImage;
