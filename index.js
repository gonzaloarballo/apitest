import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const port = 3000;

const readData = () => {
    try {
        const data = fs.readFileSync("./data.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./data.json", JSON.stringify(data)); 
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Bienvenido a mi API con Node.js!");
});

app.get("/botones", (req, res) => {
    const data = readData();
    res.json(data.botones);
})

app.get("/botones/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const boton = data.botones.find((boton) => boton.id === id);
    res.json(boton);
});

app.post("/botones", (req, res) => {
    const data = readData();
    const body = req.body;
    const nuevoBoton = {
        id: data.botones.length + 1,
        ...body,
    };
    data.botones.push(nuevoBoton);
    writeData(data);
    res.json(nuevoBoton);
});

app.put("/botones/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const botonIndex = data.botones.findIndex((boton) => boton.id === id);
    data.botoness[botonIndex] = {
        ...data.botones[botonIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "El botón fue actualizado correctamente! :)" });
});

app.delete("/botones/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const botonIndex = data.botones.findIndex((boton) => boton.id === id);
    data.botones.splice(botonIndex, 1);
    writeData(data);
    res.json({ message: "Botón eliminado correctamente. Te vamos a extrañar, botón! :("})
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});