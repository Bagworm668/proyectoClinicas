//console.log("probando ando")
import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv'
import doctorRoutes from './routes/DoctorRoutes.js'
import pacientRoutes from './routes/PacientRoutes.js'


const app = express()

dotenv.config();

conectarDB();

app.use(express.json());
app.use("/doctores",doctorRoutes);  //aqui había un error la ruta estaba mal
app.use("/pacientes/",pacientRoutes);

//



const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Servidor shi en el puerto ${PORT}`)
});