import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListOfWriting } from "./components/ListOfWriting";
import { DetailOfWriting } from "./components/DetailOfWriting";
import { AddWriting } from "./components/AddWriting";
import { EditWriting } from "./components/EditWriting";
export default function App() {
  return (
    <Router>
      <div className="main_wrapper">
        <header></header>
        <div className="ui raised very padded text container segment">
          <Routes>
            <Route path="/" element={<ListOfWriting />} />
            <Route path="/posts/:id" element={<DetailOfWriting />} />
            <Route path="/addWriting" element={<AddWriting />} />
            <Route path="/posts/:id/edit" element={<EditWriting />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
