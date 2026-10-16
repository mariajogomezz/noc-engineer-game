const express = require("express");

const app = express();

app.use(express.static("public")); //Cuando alguien entre en la web, busca los archivos dentro de la carpeta public 

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
