const mongoose = require("mongoose");
const logger = require("../middleware/logger");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with the server: ${data.connection.host}`);
    })
    .catch((error) => {
      logger.error(error);
    });
};

module.exports = { connectDatabase };
