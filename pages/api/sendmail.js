const nodemailer = require("nodemailer")

export default async function handler(req, res) {
    const { name, email, totalFee, totalAmountPaid } = req.body


    let message = {
        from: "oreo.max.1998@gmail.com",
        to: email,
        subject: "ज्ञानपीठ - Outstanding payment reminder",
        html: `<p>Hello ${name.split(" ")[0]}, </p><br>
        
I hope you are well.

We have not yet received the payment of <span style="color:red;font-weight:bold">${totalFee-totalAmountPaid}₹</span> from you.<br><br>

I would be really grateful if you could let me know when we can expect to receive payment.<br><br>

Best regards,

<p style="font-weight:bold">ज्ञानपीठ</p> `
    };

    let tr = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    try {
        let data = await tr.sendMail(message)
        return res.status(200).json({ success: true })


    }
    catch (err) {
        return res.status(500).json({ success: false })
    }


}
