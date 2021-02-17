const express = require("express");
const app = express();

const PORT = process.env.PORT || "8080";

app.use(express.static(__dirname + "/dist/estock-wms-app"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/estock-wms-app/index.html");
});

app.listen(PORT, () => {
  console.log("Servidor iniciado na porta: " || PORT);
});
