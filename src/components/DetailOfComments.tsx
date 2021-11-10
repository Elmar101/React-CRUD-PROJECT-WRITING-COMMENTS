import React from "react";
import { ListOfComments } from "./ListOfComments";
import { FormComments } from "../components/FormComments";
interface ICommentBody {
  display_name: string;
  body: string;
}
interface Props {
  datailComments: {
    id: number;
    display_name: string;
    body: string;
    created_at: Date | null;
    post_id: number;
  }[];
  handleCommentSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    commentBody: ICommentBody
  ) => void;
}

export const DetailOfComments = (props: Props) => {
  return (
    <React.Fragment>
      <ListOfComments writingComments={props.datailComments} />
      <FormComments handleCommentSubmit={props.handleCommentSubmit} />
    </React.Fragment>
  );
};
