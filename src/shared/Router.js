import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import Post from "../pages/Post";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/form" element={<Post />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;