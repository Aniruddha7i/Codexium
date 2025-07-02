import userModel from "../models/userModel.js";

export const createUser = async ({name,password,email})=>{
    if(!name || !password || !email) throw new Error("All fields are required");

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userModel.create({
        name,
        password: hashedPassword,
        email
    });

    return user;
}