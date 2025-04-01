import { Router } from "express";
import AuthService from '../db/auth.js'

const router = Router()

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        
        if (!result) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        // Store user info in session
        req.session.user = result;
        
        res.status(200).json({ message: "Login successful",user: result});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
});
router.get("/check-login", (req, res) => {
    console.log("Checking login")
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
        console.log("user is logged")
    } else {
        res.json({ loggedIn: false });
        console.log("user is not logged")

    }
});
router.post("/signup", async (req, res) => {
    try {
        const {username,email,password} = req.body;
        const result = await AuthService.register(username,email, password);
        if(result){
            const logResult = await AuthService.login(email, password);
            if(logResult){
                req.session.user = logResult.user; // Store user in session
            }else{
                res.status(400).json({ error: "Could not login automatically!" });
            }
        }
        
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;