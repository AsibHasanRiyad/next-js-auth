import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {email, password} = reqBody;
    console.log(reqBody);

    //check if the user exist or not
    const user = await User.findOne({email})
    if (!user) {
        return NextResponse.json({error:"User dose not exist"},{status:400})
    }

    //check password
    const validatePassword = await bcryptjs.compare(password, user.password)
    if (!validatePassword) {
      return NextResponse.json({error:"Password incorrect"},{status:400})
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, {status:500});
  }
}

connect();
