import mongoose from 'mongoose';
import bcrypt from "bcrypt";


const pacientSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    password : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    Celular : {
        type: String,
        default: null,
        trim: true
    },

    token : {
        type: String,
    },

    confirmado : {
        type: Boolean,
        default: false
    }
});


// Antes de guardar, hashear el password
pacientSchema.pre("save", async function(next) {

    //obtengo el documento de pacient
    const pacient = this;

    if (!pacient.isModified("password")) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(pacient.password, 10);
    //remplazo la contra por el hash
    pacient.password = hashedPassword;
    pacient.token = generarTokenNumerico()
    next();
});

const generarTokenNumerico = () => {
    const min = 100000; // Número mínimo de 6 dígitos
    const max = 999999; // Número máximo de 6 dígitos
    return Math.round(Math.random() * (max - min) + min);
}


const Pacient = mongoose.model("Pacient", pacientSchema);
export {

    Pacient,pacientSchema
}