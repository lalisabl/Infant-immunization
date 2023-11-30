require("dotenv").config();
const app = require("./app");
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`app running on ${port} port!`);
});
