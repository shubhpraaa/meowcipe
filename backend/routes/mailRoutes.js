import { Router } from "express";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const router = Router()

const message = `Hi,

Thank you for subscribing to our recipe newsletter! 🎉

We're thrilled to have you join our community of food lovers. From quick weeknight meals to mouth-watering desserts, we’ll be serving up delicious recipes straight to your inbox.

Stay tuned for new recipes, cooking tips, and a sprinkle of inspiration every week. 🍽️✨

If you ever have a favorite dish you’d love to see featured, just hit reply and let us know!

Happy cooking,  
The Meowcipe Team  
`

async function sendMail(email) {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.API_KEY_MAILGUN || "API_KEY",
    });
    try {
      const data = await mg.messages.create("sandboxebf3d88418c54a4db9fc3f8d4c146b5c.mailgun.org", {
        from: "Mailgun Sandbox <postmaster@sandboxebf3d88418c54a4db9fc3f8d4c146b5c.mailgun.org>",
        to: [`S Prakash <${email}>`],
        subject: "Thanks for Subscribing to Our Recipe Newsletter!",
        text: message,
      });
    } catch (error) {
      console.log(error);
    }
}

router.post('/sendMail',async (req,res)=>{
    await sendMail(req.body.clientMail)
    res.status(200).json({message:"success"})
})

export default router;