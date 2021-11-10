import React, { useState } from "react";
interface Props {
  handleCommentSubmit: (event: Event, data: ICommentBody) => void;
}
interface ICommentBody {
  display_name: string;
  body: string;
}
const initialCommentBody: ICommentBody = {
  display_name: "",
  body: ""
};
export const FormComments = (props: Props) => {
  const [commentBody, setCommentBody] = useState<ICommentBody>(
    initialCommentBody
  );
  const handleCommentChange = (event: any) => {
    event.preventDefault();
    if (event.target) {
      setCommentBody({
        ...commentBody,
        [event?.target?.name]: event?.target?.value
      });
    }
  };
  return (
    <React.Fragment>
      <h1>------- Enter Form Comments-------</h1>
      <form
        className="ui form"
        onSubmit={() => {
          props.handleCommentSubmit(event, commentBody);
          setCommentBody({ ...initialCommentBody });
        }}
      >
        <div className="ui small icon input">
          <input
            name="display_name"
            value={commentBody.display_name}
            onChange={handleCommentChange}
            type="text"
            placeholder="Enter Name..."
          />
        </div>
        <textarea
          name="body"
          value={commentBody.body}
          onChange={handleCommentChange}
          placeholder="Enter comments"
          rows={3}
        ></textarea>
        <button className="ui primary button" type="submit">
          Sent Comment
        </button>
      </form>
    </React.Fragment>
  );
};
