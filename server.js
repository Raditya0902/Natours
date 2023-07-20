const mongoose = require("mongoose"); //this is required to make mongodb connection with our js easily, and also easy to build Models from mongodb
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  ("Uncaught exception: Shutting down.");
  //console.log(err);
  //console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    // the object we're sending to mongoose.connect is to avoid deprecation warnings.
  })
  .then(() => {
    //console.log("DB connection successful.");
  })
  .catch((err) => {
    //console.log("DB connection not successful.", err);
  });

// console.log(process.env);
// console.log(app.get("env")); //right now in development.

//////////start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  //console.log("App running on port " + port);
});

process.on("unhandledRejection", (err) => {
  //console.log("Unhandled rejection: Shutting down.");
  //console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
