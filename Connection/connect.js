const mongoose = require("mongoose");
async function getConnection() {
  await mongoose.connect(process.env.database_url, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connection successful");
    }
  });
}
module.exports = getConnection;
