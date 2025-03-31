import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/index.html'))
})
router.get('/my-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/myRecipe.html'))
})
router.get('/add-recipe',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/pages/addRecipe.html'))
})

router.post("/login", async (req, res) => {
    try {
        const {username,password} = req.body;
        //const result = await AuthService.login(email, password);

        //req.session.user = result.user; // Store user in session
        console.log(username,' logged In')
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post("/signup", async (req, res) => {
    try {
        const {username,email,password} = req.body;
        //const result = await AuthService.login(email, password);

        //req.session.user = result.user; // Store user in session
        console.log(username,' Signed UP')
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;