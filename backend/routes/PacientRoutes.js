import express from 'express'
import {cpacientes,login,perfil} from '../controllers/pacienteController.js';


const router = express.Router();
router.post('/registrarpaci', cpacientes);
router.get('/login', login);
router.get('/perfil', perfil);

router.get("/login",(req,res)=>{
    res.send("desde la ruta /api/login")   
});
router.get("/perfil",(req,res)=>{
    res.send("desde la ruta /api/login")  
});


export default router;

