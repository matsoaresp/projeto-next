import { API_CONFIG } from "@/app/config/environment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      ...body,
      tipo: "professor",
    };

    const backendUrl = `${API_CONFIG.BASE_URL}/persons/create`;

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await backendRes.json();

    return NextResponse.json(result, { status: backendRes.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno ao comunicar com o backend" },
      { status: 500 }
    );
  }
}
