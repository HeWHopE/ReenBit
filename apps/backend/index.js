require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userRoute.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const messageRoute = require("./routes/messageRoute.js");
const chatRouter = require("./routes/chatRoute.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api", messageRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
