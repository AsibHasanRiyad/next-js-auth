import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModels'
import bcryptjs from "bcryptjs"



connect()

export async function POST(request: NextRequest){
    try {
      const reqBody=  await request.json()
      const {name, email, password} = reqBody

      console.log(reqBody);
    // check if user is already exist
    const user = await User.findOne({email})
    if (user) {
        return NextResponse.json({error:'User already exists'}, {status:400})
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })

   const savedUser =  await newUser.save()
   console.log(savedUser);

   return NextResponse.json({
    message:'User created successfully',
    success:true,
    savedUser
   })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}),
        {status:500 }
    }
}