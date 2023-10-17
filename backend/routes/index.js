const userRouter = require("./user");
const vocabularyRouter = require("./vocabulary");

const initRoute = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/vocabulary", vocabularyRouter);
};

module.exports = initRoute;
