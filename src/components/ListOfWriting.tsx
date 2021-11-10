import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../src/api/Api";
interface IData {
  id: number;
  title: string;
  content: string;
  created_at: Date | null;
}

export const ListOfWriting = () => {
  const [listOfWriting, setListOfWriting] = useState<IData[]>([]);
  useEffect(() => {
    api()
      .get("/posts")
      .then((res) => setListOfWriting(res.data));
  }, []);

  return (
    <div className="ui relaxed divided list">
      {listOfWriting.map((list: IData) => {
        return (
          <div className="item" key={list.id}>
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`posts/${list.id}`} className="header">
                {list.title}
              </Link>
              <div className="description">{list.created_at}</div>
            </div>
          </div>
        );
      })}
      <hr />
      <Link to={`addWriting`} className="ui inverted primary button">
        Add writing
      </Link>
    </div>
  );
};
