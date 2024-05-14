import Doctor from '../models/Doctor.js';

const cdoctores = async (req, res) => {
    try {
      // Verificarmo si el usuario ya está registrado en la base de datos
      const existingDoctor = await Doctor.findOne({ email: req.body.email });
      if (existingDoctor) {
        // Si el usuario ya existe, con esta funcion se envia un mensaje de error 400
        return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos' });
      }
  
      // Si el usuario no está registrado, creamos uno nuevo
      const doctor = new Doctor(req.body); 
      const doctorGuardado = await doctor.save(); 
  
      res.json({ mensaje: 'Registrando un nuevo doctor' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Hubo un error' });
    }
  };
  
const perfil = (req, res) => {
   res.json({url: "Esta es la ruta perfil"});
};


export const crearDoctor = async (req, res) => {
  try {
      const { nombre, password, email, Celular, confirmado } = req.body;
      
      // Generar un token único
      const token = generarTokenNumerico();


      const nuevoDoctor = new Doctor({
          nombre,
          password,
          email,
          Celular,
          token,
          confirmado
      });

      const savedDoc = await nuevoDoctor.save();

      // Enviar una respuesta exitosa
      res.status(201).json({ mensaje: "Nuevo doctor registrado exitosamente", doctor: savedDoc });
  } catch (error) {
      // Manejar errores
      console.error("Error al crear un nuevo doctor:", error);
      res.status(500).json({ error: "Ocurrió un error al crear un nuevo doctor" });
  }
};

export const login = (req, res)=> {
  res.send({msg:"desde la ruta /api/doctores"})
};
// Función para generar un token numérico único
const generarTokenNumerico = () => {
  const min = 100000; // Número mínimo de 6 dígitos
  const max = 999999; // Número máximo de 6 dígitos
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export{
    cdoctores, perfil
}