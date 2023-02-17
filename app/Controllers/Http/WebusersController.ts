// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Webuser from "App/Models/Webuser"
import WebuserValidator from 'App/Validators/WebuserValidator';
import OptionalValidator from 'App/Validators/OptionalValidator';
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'


export default class WebusersController {
   
   public async login({request,response}:HttpContextContract):Promise<void>{
      const {email}=request.body()
      console.log(email)
      const jwtKey:string= Env.get('TOKEN_SECRET')
      
      const token=jwt.sign({email},jwtKey,{expiresIn:'1800s'})
      console.log(jwtKey)
      response.send(token)
   }
   
 public async welcome():Promise<object>{
        return({ welcome: 'To the EmployeData' })
    }


  public async store({request,response}:HttpContextContract):Promise<void>{

   const payload =await request.validate(WebuserValidator)
   console.log(payload);
   
   const data:Webuser=await Webuser.create(payload)
   response.send({data})
 }
 public async find({response,params}:HttpContextContract):Promise<void>{
    const {id}:any =params
    response.send(await Webuser.find(id))
 }
 
 public async getData({response}):Promise<void>{
    response.send(await Webuser.all())
}

 public async delete({response,params}:HttpContextContract):Promise<void>{
    const{id}:any=params
    if(id){
        const result:Webuser = await Webuser.findOrFail(id)
        response.send(await result.delete())
    }else{
        response.send("Unable to delete the row")
    }
 }
 async update(ctx:HttpContextContract):Promise<void>{
      const {id}=ctx.params
       if(id){

          const result:Webuser=await Webuser.findOrFail(id)
          const validateData=await ctx.request.validate(OptionalValidator)
        if(validateData)
         // result.createdAt= (DateTime.local());
        // console.log(ctx.request.body().name)
         result.name= ctx.request.body().name
         ctx.response.send(await result.save());
            
        }
         else{
            ctx.response.send("Unable to update the row")
   
        }

 }
  
}


