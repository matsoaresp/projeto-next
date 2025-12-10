import { NextRequest, NextResponse } from "next/server";
import {API_CONFIG} from '@/app/config/environment'


export async function POST(request: NextRequest){
console.log('🟣 [API AUTH CLIENTS] Iniciando processo de login de clientes...');
console.log('🟣 [API AUTH CLIENTS] Request headers:', Object.fromEntries(request.headers.entries()));
  
try{
const body = await request.json();
const {email, password} = body;

  console.log('🟣 [API AUTH CLIENTS] Dados recebidos:', { 
      email, 
      password: password ? '***' : 'undefined',
      hasEmail: !!email,
      hasPassword: !!password,
      bodyKeys: Object.keys(body),
      bodySize: JSON.stringify(body).length
    });


    if (!email || !password) {
      console.log('❌ [API AUTH CLIENTS] Dados incompletos - email ou senha em branco');
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const backendUrl = API_CONFIG.BASE_URL;
    const fullUrl = `${backendUrl}/auth/login`

    console.log('🟣 [API AUTH CLIENTS] Configuração do backend:', {
      backendUrl,
      fullUrl,
      env: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });

    console.log('🟣 [API AUTH CLIENTS] Preparando chamada para backend...');
    console.log('🟣 [API AUTH CLIENTS] Payload para backend:', { 
      email, 
      password: '***',
      contentType: 'application/json'
    });

    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password})
    });

    console.log('🟣 [API AUTH CLIENTS] Resposta do backend recebida:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url,
      type: response.type,
      headers: Object.fromEntries(response.headers.entries())
    });

    console.log('🟣 [API AUTH CLIENTS] Tentando fazer parse da resposta JSON...');
    const data = await response.json();
    console.log('🟣 [API AUTH CLIENTS] Dados do backend parseados:', {
      hasAccessToken: !!data.access_token,
      hasClient: !!data.client,
      clientEmail: data.client?.email,
      clientName: data.client?.name,
      clientId: data.client?.id,
      dataKeys: Object.keys(data),
      dataType: typeof data,
      isArray: Array.isArray(data)
    });

    if (!response.ok) {
      console.log('❌ [API AUTH CLIENTS] Erro do backend - resposta não OK:', {
        status: response.status,
        statusText: response.statusText,
        errorData: data,
        errorMessage: data.message || 'Erro desconhecido',
        errorCode: data.code || 'NO_CODE'
      });
      return NextResponse.json(
        { message: data.message || 'Erro ao fazer login' },
        { status: response.status }
      );
    }


    console.log('🟣 [API AUTH CLIENTS] Validando estrutura dos dados recebidos...');
    
    // Verifica se tem os dados necessários
    if (!data.access_token) {
      console.log('❌ [API AUTH CLIENTS] Erro: access_token não encontrado na resposta');
      return NextResponse.json(
        { message: 'Token de acesso não encontrado na resposta' },
        { status: 500 }
      );
    }

    if (!data.client) {
      console.log('❌ [API AUTH CLIENTS] Erro: client não encontrado na resposta');
      return NextResponse.json(
        { message: 'Dados do cliente não encontrados na resposta' },
        { status: 500 }
      );
    }

    console.log('🟣 [API AUTH CLIENTS] Adaptando resposta para o formato esperado pelo frontend...');
    // Adapta a resposta para o formato esperado pelo frontend
    const adaptedResponse = {
      user: {
        id: data.client.id,
        email: data.client.email,
        name: data.client.fullName || data.client.name || data.client.email,
        role: 'paciente', // Mapeia 'client' para 'paciente'
        clientRoleId: data.client.personRoles?.[0]?.id, // ID do role de cliente
      },
      access_token: data.access_token,
    };

    console.log('✅ [API AUTH CLIENTS] Resposta adaptada com sucesso:', {
      userId: adaptedResponse.user.id,
      userEmail: adaptedResponse.user.email,
      userName: adaptedResponse.user.name,
      userRole: adaptedResponse.user.role,
      hasToken: !!adaptedResponse.access_token,
      tokenLength: adaptedResponse.access_token?.length || 0,
      tokenStart: adaptedResponse.access_token?.substring(0, 10) + '...'
    });

    console.log('🟣 [API AUTH CLIENTS] Enviando resposta final para o cliente...');
    return NextResponse.json(adaptedResponse);

}catch(error){
    console.error('❌ [API AUTH CLIENTS] Erro interno capturado:', {
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
      hasStack: error instanceof Error && !!error.stack
    });

    if (error instanceof Error) {
      console.error('❌ [API AUTH CLIENTS] Stack trace completo:', error.stack);
      
      // Verifica se é erro de conexão/rede
      if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
        console.error('❌ [API AUTH CLIENTS] Erro de conexão com o backend detectado');
        return NextResponse.json(
          { message: 'Erro de conexão com o servidor. Verifique se o backend está rodando.' },
          { status: 503 }
        );
      }
      
      // Verifica se é erro de parsing JSON
      if (error.message.includes('JSON') || error.message.includes('parse')) {
        console.error('❌ [API AUTH CLIENTS] Erro de parsing JSON detectado');
        return NextResponse.json(
          { message: 'Erro ao processar resposta do servidor' },
          { status: 502 }
        );
      }
    }

    console.error('❌ [API AUTH CLIENTS] Retornando erro genérico 500');
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
}
}