const mongoose = require("mongoose")

const calculateSchema = mongoose.Schema({

annual_installment_amount : Number,
annual_interest_rate : Number,
total_years: Number

})

const CalculateModel = mongoose.model("calculate", calculateSchema)

module.exports={
    CalculateModel
}