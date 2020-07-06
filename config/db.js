const mongoose = require("mongoose");

require("../models/activity");
require("../models/advice");
require("../models/article");
require("../models/audio");
require("../models/bible_study");
require("../models/devotional");
require("../models/doctype");
require("../models/event");
require("../models/paragraph");
require("../models/request");
require("../models/time");
require("../models/user");
require("../models/video");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
