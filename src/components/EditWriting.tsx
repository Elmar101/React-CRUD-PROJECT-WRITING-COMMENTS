import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/Api";
import FormOfWriting, { IText, initialText } from "../components/FormOfWriting";
export const EditWriting = () => {
  const params = useParams();

  const [text, setText] = useState<IText>(initialText);
  useEffect(() => {
    api()
      .get(`/posts/${params.id}`)
      .then((res) => {
        console.log("id res", res.data);
        setText({ ...text, title: res.data.title, content: res.data.content });
      });
  }, []);
  return (
    <React.Fragment>
      <h1>Edit Writing</h1>
      <FormOfWriting text={text} />
    </React.Fragment>
  );
};
