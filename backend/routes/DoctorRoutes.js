import express from 'express'
import {cdoctores,login,perfil} from '../controllers/doctorControllers.js';


const router = express.Router();



router.post('/registrardoc', cdoctores);
router.get('/login', login);
router.get('/perfil', perfil);

router.get("/login",(req,res)=>{
    res.send("desde la ruta /api/login")   
});
router.get("/perfil",(req,res)=>{
    res.send("desde la ruta /api/login")  
});


export default router;

//