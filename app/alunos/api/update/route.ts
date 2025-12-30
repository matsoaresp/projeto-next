import { API_CONFIG } from "@/app/config/environment";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest){

    try {
        const body = await req.json();
        const payload = {
            ...body,
            name:body.name,
            email: body.email,
            matricula: body.matricula
        }

        const backendUrl = `${API_CONFIG.BASE_URL}/persons/id`;
        const backendRes = await fetch(backendUrl, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
         });

         const result = await backendRes.json()
         return NextResponse.json(result {status: backendRes.status});
    }catch(error){
        console.error(error);
        return NextResponse.json(
            {message: "Erro inteiro ao comunicar o backend"},
            {status: 500}
        );
    }
}