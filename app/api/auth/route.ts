import { NextRequest, NextResponse } from "next/server";
import {API_CONFIG} from '@/app/config/environment'


export async function POST(request: NextRequest){
console.log('🟣 [API AUTH USERS] Iniciando processo de login de users...');
console.log('🟣 [API AUTH USERS] Request headers:', Object.fromEntries(request.headers.entries()));
  
try{
const body = await request.json();
const {email, password} = body;

  console.log('🟣 [API AUTH USERS] Dados recebidos:', { 
      email, 
      password: password ? '***' : 'undefined',
      hasEmail: !!email,
      hasPassword: !!password,
      bodyKeys: Object.keys(body),
      bodySize: JSON.stringify(body).length
    });


    if (!email || !password) {
      console.log('❌ [API AUTH USERS] Dados incompletos - email ou senha em branco');
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const backendUrl = API_CONFIG.BASE_URL;
    const fullUrl = `${backendUrl}/auth/login`

    console.log('🟣 [API AUTH USERS] Configuração do backend:', {
      backendUrl,
      fullUrl,
      env: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });

    console.log('🟣 [API AUTH USERS] Preparando chamada para backend...');
    console.log('🟣 [API AUTH USERS] Payload para backend:', { 
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

    console.log('🟣 [API AUTH USERS] Resposta do backend recebida:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url,
      type: response.type,
      headers: Object.fromEntries(response.headers.entries())
    });

    console.log('🟣 [API AUTH USERS] Tentando fazer parse da resposta JSON...');
    const data = await response.json();
    console.log('🟣 [API AUTH USERS] Dados do backend parseados:', {
      hasAccessToken: !!data.access_token,
      hasUser: !!data.user,
      userEmail: data.user?.email,
      userName: data.user?.name,
      userId: data.user?.id,
      dataKeys: Object.keys(data),
      dataType: typeof data,
      isArray: Array.isArray(data)
    });

    if (!response.ok) {
      console.log('❌ [API AUTH USERS] Erro do backend - resposta não OK:', {
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


    console.log('🟣 [API AUTH USERS] Validando estrutura dos dados recebidos...');
    
    // Verifica se tem os dados necessários
    if (!data.access_token) {
      console.log('❌ [API AUTH USERS] Erro: access_token não encontrado na resposta');
      return NextResponse.json(
        { message: 'Token de acesso não encontrado na resposta' },
        { status: 500 }
      );
    }

    if (!data.user) {
      console.log('❌ [API AUTH USERS] Erro: user não encontrado na resposta');
      return NextResponse.json(
        { message: 'Dados do user não encontrados na resposta' },
        { status: 500 }
      );
    }

    console.log('🟣 [API AUTH USERS] Adaptando resposta para o formato esperado pelo frontend...');
    // Adapta a resposta para o formato esperado pelo frontend
    const adaptedResponse = {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.fullName || data.user.name || data.user.email,
        role: 'paciente', // Mapeia 'client' para 'paciente'
        userRoleId: data.user.personRoles?.[0]?.id, // ID do role de cliente
      },
      access_token: data.access_token,
    };

    console.log('✅ [API AUTH USERS] Resposta adaptada com sucesso:', {
      userId: adaptedResponse.user.id,
      userEmail: adaptedResponse.user.email,
      userName: adaptedResponse.user.name,
      userRole: adaptedResponse.user.role,
      hasToken: !!adaptedResponse.access_token,
      tokenLength: adaptedResponse.access_token?.length || 0,
      tokenStart: adaptedResponse.access_token?.substring(0, 10) + '...'
    });

    console.log('🟣 [API AUTH USERS] Enviando resposta final para o user...');
    return NextResponse.json(adaptedResponse);

}catch(error){
    console.error('❌ [API AUTH USERS] Erro interno capturado:', {
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
      hasStack: error instanceof Error && !!error.stack
    });

    if (error instanceof Error) {
      console.error('❌ [API AUTH USERS] Stack trace completo:', error.stack);
      
      // Verifica se é erro de conexão/rede
      if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
        console.error('❌ [API AUTH USERS] Erro de conexão com o backend detectado');
        return NextResponse.json(
          { message: 'Erro de conexão com o servidor. Verifique se o backend está rodando.' },
          { status: 503 }
        );
      }
      
      // Verifica se é erro de parsing JSON
      if (error.message.includes('JSON') || error.message.includes('parse')) {
        console.error('❌ [API AUTH USERS] Erro de parsing JSON detectado');
        return NextResponse.json(
          { message: 'Erro ao processar resposta do servidor' },
          { status: 502 }
        );
      }
    }

    console.error('❌ [API AUTH USERS] Retornando erro genérico 500');
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
}
}