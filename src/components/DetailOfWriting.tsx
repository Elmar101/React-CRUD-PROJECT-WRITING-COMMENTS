import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { DetailOfComments } from "../components/DetailOfComments";
import { api } from "../../src/api/Api";
import DeleteModal from "./subComponents/DeleteModal";
interface IDetail {
  id: number;
  title: string;
  content: string;
  created_at: Date | null;
}

interface IComments {
  id: number;
  display_name: string;
  body: string;
  created_at: Date | null;
  post_id: number;
}
interface ICommentBody {
  display_name: string;
  body: string;
}

export const DetailOfWriting = () => {
  let params = useParams();
  const [detailOfWritnig, setDetailOfWriting] = useState<IDetail>({
    id: 0,
    title: "",
    content: "",
    created_at: null
  });
  const [comments, setComments] = useState<IComments[]>([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://react-yazi-yorum.herokuapp.com/posts/" + params.id),
        axios.get(
          "https://react-yazi-yorum.herokuapp.com/posts/" +
            params.id +
            "/comments"
        )
      ])
      .then((responses) => {
        console.log("get responses all", responses);
        setDetailOfWriting(responses[0].data);
        setComments(responses[1].data);
      });
  }, []);

  const handleCommentSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    commentBody: ICommentBody
  ) => {
    api()
      .post(`/posts/${params.id}/comments`, commentBody)
      .then((response) => {
        console.log("enter comments: ", response.data);
        setComments([...comments, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <h2 className="ui header">{detailOfWritnig.title}</h2>
      <p>{detailOfWritnig.created_at}</p>
      <div className="ui buttons">
        <Link className="ui blue button" to={`/posts/${params.id}/edit`}>
          EDIT
        </Link>
        <DeleteModal detailOfWritnig={detailOfWritnig} />
        <Link className="ui inverted primary button" to={`/`}>
          List of Writing
        </Link>
      </div>
      <p>{detailOfWritnig.content}</p>
      <DetailOfComments
        datailComments={comments}
        handleCommentSubmit={handleCommentSubmit}
      />
    </React.Fragment>
  );
};
