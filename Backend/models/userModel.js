import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
const userSchema = new mongoose.Schema({
    email : { type: String, required: true, unique: true, lowercase: true, minLength: 5, maxLength: 70 },
    password : { type: String, required: true, minLength: 4, maxLength: 1024, select: false },
    name : { type: String, required: true, minLength: 3, maxLength: 50 },
})

userSchema.statics.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.isValidPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function (){
    return  jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

const userModel = mongoose.model("User", userSchema);
export default userModel;