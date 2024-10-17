const app = require("./app.js");
const { PORT = 4040 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
