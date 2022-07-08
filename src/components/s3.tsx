import React, { useState, useCallback, useForm, FC } from "react";
import axios from "axios";

const BookForm: FC<any> = ({ onSubmit, onError }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach(async (file: File) => {
      const {
        data: { signedUrl, key },
      } = await axios.post("/images");
      await axios.put(signedUrl, file, {
        headers: {
          "Access-Control-Allow-Origin": location.href,
          "Content-Type": file.type,
        },
      });
      const res = await axios.get(`/images/${key}`);
      setImageUrl(res.data.signedUrl);
      setImageKey(key);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="block mb-4">
        <span>画像</span>
        {imageKey && <img src={imageUrl} className="h-32 m-4" />}
        <div
          className="border-dashed border-2 h-32 rounded flex justify-center items-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="block text-gray-400">Drop the files here ...</p>
        </div>
        <input
          type="hidden"
          name="key"
          ref={register({ required: true })}
          defaultValue={imageKey}
        />
        <small className="mb-2 text-red-600 block">
          {errors.key && <span>This field is required</span>}
        </small>
      </label>
      <input
        type="submit"
        value="Save"
        className="mt-4 px-6 py-2 text-white bg-accent rounded hover:bg-accent-dark"
      />
    </form>
  );
};

export default BookForm;
