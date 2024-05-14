import mongoose from "mongoose";
import bcrypt from "bcrypt";

const doctorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Celular: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

// Antes de guardar, hashear el password
doctorSchema.pre("save", async function(next) {
    const doctor = this;
    if (!doctor.isModified("password")) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(doctor.password, 10);
    doctor.password = hashedPassword;
    next();
});

// Método para comparar passwords hasheados
doctorSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
