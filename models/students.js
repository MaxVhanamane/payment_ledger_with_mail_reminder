const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    className: { type: String, required: true },
    totalFee:{type:Number,required:true},
    totalAmountPaid:{type:Number,required:true},
    lastPaymentDate:{type:Date,required:true},

}, { timestamps: true });
const Student=mongoose.models.Student || mongoose.model("Student", StudentSchema)
export default Student
