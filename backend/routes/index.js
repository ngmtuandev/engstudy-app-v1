const userRouter = require("./user");

const initRoute = (app) => {
  app.use("/api/user", userRouter);
};

module.exports = initRoute;
