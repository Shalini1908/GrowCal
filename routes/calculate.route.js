const express = require("express");

const { CalculateModel } = require("../model/Calculate.model");
const { authenticate } = require("../middleware/authenticate.middleware");
const calculateRouter =express.Router()


calculateRouter.post("/",async(req,res)=>{

try{

 const {annual_installment_amount , annual_interest_rate , total_years} =req.body;
 console.log(req.body)  
 
 let i = annual_interest_rate/100;
 let n = total_years;
 let P = annual_installment_amount
 let total_maturity_value = Math.trunc(P * (((i + 1) ** n - 1) / i))
  let total_investment_amount = P*n;
  let total_interest_gained = total_maturity_value - total_investment_amount

 res.send({
    total_maturity_value,
    total_investment_amount,
    total_interest_gained
 })
}catch(err){
    console.log(err)
    res.send("Error in calculation")
}


})

module.exports={
    calculateRouter
}
