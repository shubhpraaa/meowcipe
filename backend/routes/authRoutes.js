import { Router } from "express";
import AuthService from '../db/auth.js'

const router = Router()

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        // Store user info in session
        req.session.user = result;
        res.redirect('/')
        //res.status(200).json({ message: "Login successful",user: result});
    } catch (error) {
        //res.status(400).json({ error: error.message });
        res.redirect(`/login?error=${error.message}`)
    }
});
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
});
router.get('/api/getUserName',async (req,res)=>{
    try {
        const username = await AuthService.getUserInfo(req.query.id)
        res.json({user:username}) ;
    } catch (error) {
        console.log(error)
        res.json({data:"Not Found"})
    }
})
router.get("/check-login", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});
router.post("/signup", async (req, res) => {
    try {
        const {username,email,password} = req.body;
        const result = await AuthService.register(username,email, password);
        if(result){
            const logResult = await AuthService.login(email, password);
            if(logResult){
                req.session.user = logResult; // Store user in session
            }else{
                res.redirect(`/signup?error=Coudn't login Automatically`)
            }
        }
        res.redirect('/')
    } catch (error) {
        res.redirect(`/signup?error=${error.message}`)
    }
});

export default router;