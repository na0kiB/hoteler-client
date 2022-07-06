import React from "react";

  const handleChange = async (e) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/presigned-url`)
    const S3DirectPost = await res.json()
  
    const file = e.target.files[0]
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

  export default handleChange