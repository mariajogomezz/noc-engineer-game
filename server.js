const express = require("express");

const app = express();

app.get("/", (req,res) => {
  res.send("NOC Engineer Game funcionando");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
``
