// SE IMPORTAN LAS DEPENDENCIAS //
import express from 'express';
import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';


const app = express();
const __dirname = path.resolve();

// SE HACE PUBLICA LA CARPETA PUBLIC //
const PUBLIC_DIR = path.join(__dirname, 'public');

// SE CREA EL PUERTO DEL SERVIDOR Y SE LLAMA //
const PORT = 3000;

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});


app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});


app.get('/subir', async (req, res) => {
  const { imagen } = req.query;

  console.log(req.query)

  const nombreDeLaImagen = `${uuidv4().slice(30)}.jpeg`;
  const imagePath = path.join(PUBLIC_DIR, nombreDeLaImagen);

  try {
    const IMG = await Jimp.read(imagen);
    await IMG.resize(350, Jimp.AUTO).greyscale().writeAsync(imagePath);
    res.sendFile(imagePath);
  } catch (error) {
    
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});