import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../src/api/Api";
export interface IText {
  title: string;
  content: string;
}
export const initialText: IText = {
  title: "",
  content: ""
};
const FormOfWriting = (props: any) => {
  console.log("Editing Data Props: ", props);
  const params = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState<IText>(initialText);
  const [errText, setErrText] = useState("");
  useEffect(() => {
    if (props.text?.title && props.text?.content) {
      setText(props.text);
    }
  }, [props.text]);
  const handleTextChange = (event: any) => {
    if (event.target) {
      setText({ ...text, [event.target?.name]: event.target?.value });
    }
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    if (props.text?.title && props.text?.content) {
      api()
        .put(`/posts/${params.id}`, text)
        .then((res) => {
          console.log("put response : ", res);
          navigate(`/posts/${params.id}`);
        })
        .catch((err) => {
          console.log(err);
          setErrText(err);
        });
    } else {
      api()
        .post("/posts", text)
        .then((res) => {
          console.log("text response: ", res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setErrText(err);
        });
    }
  };

  return (
    <React.Fragment>
      <div className="ui form">
        <div className="field">
          <label>Header of Writing</label>
          <input
            type="text"
            name="title"
            value={text.title}
            onChange={handleTextChange}
          />
          {errText && <p> Title is important </p>}
        </div>

        <div className="field">
          <label>Add Text</label>
          <textarea
            rows={2}
            name="content"
            value={text.content}
            onChange={handleTextChange}
          ></textarea>
          {errText && <p> Content is important </p>}
        </div>
        <button className="ui primary button" onClick={formSubmit}>
          Send
        </button>
        <button className="ui button" onClick={() => navigate("/")}>
          Cancle
        </button>
      </div>
    </React.Fragment>
  );
};

export default FormOfWriting;
