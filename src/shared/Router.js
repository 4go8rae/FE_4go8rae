import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat";
import Main from "../pages/Main";
import Post from "../pages/Post";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/form" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;