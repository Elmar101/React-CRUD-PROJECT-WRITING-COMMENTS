import React, { useState } from "react";

interface Props {
  writingComments: {
    id: number;
    display_name: string;
    body: string;
    created_at: Date | null;
    post_id: number;
  }[];
}

export const ListOfComments = (props: Props) => {
  return (
    <React.Fragment>
      <h1>------- Comments-------</h1>
      {props.writingComments?.map((comment) => {
        return (
          <div className="ui relaxed list" key={comment.id}>
            <div className="item">
              <div className="content">
                <h1 className="header">{comment.display_name}</h1>
                <div className="description">
                  <span style={{ paddingRight: "20px" }}>{comment.body}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
