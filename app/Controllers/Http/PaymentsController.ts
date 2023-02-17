// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from "App/Models/Payment"
import PaymentValidator from 'App/Validators/PaymentValidator';
import OptionalValidator from 'App/Validators/OptionalValidator';
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'


export default class PaymentsController {
   
   public async login({request,response}:HttpContextContract):Promise<void>{
      const {email}=request.body()
      console.log(email)
      const jwtKey:string= Env.get('TOKEN_SECRET')
      
      const token=jwt.sign({email},jwtKey,{expiresIn:'1800s'})
      console.log(jwtKey)
      response.send(token)
   }
   
 public async welcome():Promise<object>{
        return({ welcome: 'Payment Mode' })
    }


public async store({request,response}:HttpContextContract):Promise<void>{

   const payload =await request.validate(PaymentValidator)
   console.log(payload);
   
   const data:Payment =await Payment.create(payload)
   response.send({data})
 }
 public async find({response,params}:HttpContextContract):Promise<void>{
    const {id}:any =params
    response.send(await Payment.find(id))
 }
 
 public async getData({response}):Promise<void>{
    response.send(await Payment.all())
}

 public async delete({response,params}:HttpContextContract):Promise<void>{
    const{id}:any=params
    if(id){
        const result:Payment = await Payment.findOrFail(id)
        response.send(await result.delete())
    }else{
        response.send("Unable to delete the row")
    }
 }
 async update(ctx:HttpContextContract):Promise<void>{
      const {id}=ctx.params
       if(id){

          const result:Payment=await Payment.findOrFail(id)
          const validateData=await ctx.request.validate(OptionalValidator)
        if(validateData)
         // result.createdAt= (DateTime.local());
        // console.log(ctx.request.body().name)
         result.username= ctx.request.body().username
         ctx.response.send(await result.save());
            
        }
         else{
            ctx.response.send("Unable to update the row")
   
        }

 }
  
}


