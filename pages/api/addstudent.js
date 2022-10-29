import connectDb from '../../middleware/mongoose';
import Student from '../../models/students';
export default async function handler(req, res) {
    connectDb()

    if (req.method === "POST") {
        try{
            let studentDetails = new Student({
                name: req.body.name,
                email: req.body.email, 
                phone:req.body.phone,
                className: req.body.className,
                totalFee: req.body.totalFee,
                totalAmountPaid: req.body.totalAmountPaid,
                lastPaymentDate:req.body.lastPaymentDate,
               
            })
           let result= await studentDetails.save()
        return res.status(200).json({ success: true })
        }
        catch(error){
            if (error.name === "ValidationError") {
                let errors = {};
          
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
          
                return res.status(400).json({ success: false,error:errors });
              }
        }
           
       
    }
    else {
        res.status(400).send({ error: "Not allowed" })
    }

}

