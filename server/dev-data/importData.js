const mongoose = require("mongoose");
const fs = require("fs");

mongoose
  .connect(
    process.env.DATABASE_URL.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    ),
    {}
  )
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err.message));

const PropertyData = JSON.parse(
  fs.readFileSync(`${__dirname}/property-data.json`, "utf-8")
);

const importData = () => {
  try {
    // await
  } catch (error) {
    console.log(error.message);
  }
};

if (process.argv[2] === "--import") {
  importData();
}
