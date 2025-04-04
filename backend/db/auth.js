import mongoose from "mongoose";
import bcrypt from 'bcrypt'
// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userSchema);

class AuthService {
    static async register(username, email, password) {
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                throw new Error("User already exists");
            }
            const newUser = new User({ username, email, password });
            await newUser.save();
            return { message: "User registered successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async login(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    static async getUserInfo(id){
        try{
            const user = await User.findById(id);
            return user.username;
        }catch(error){
            throw new Error(error.message);
        }
    }
}

export default AuthService;