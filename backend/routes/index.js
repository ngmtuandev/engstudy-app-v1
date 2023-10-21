const userRouter = require("./user");
const vocabularyRouter = require("./vocabulary");
const postRouter = require("./post");

const initRoute = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/vocabulary", vocabularyRouter);
  app.use("/api/post", postRouter);
};

module.exports = initRoute;
