import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  console.log('=== API ROUTE SEARCH CHAMADA ===');
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  console.log('Query recebida:', query);
  
  if (!query || query.trim().length < 4) {
    console.log('Query muito curta, retornando erro');
    return NextResponse.json({ error: 'Query deve ter pelo menos 4 caracteres' }, { status: 400 });
  }

  try {
    const searchQuery = encodeURIComponent(query.trim());
    const apiUrl = `https://api.chamanozap.net/wp-json/wp/v2/posts?search=${searchQuery}&_embed&orderby=relevance&order=desc&per_page=20`;
    
    console.log('Fazendo proxy para:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'ChamaNoZap-Blog/1.0',
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache por 5 minutos
    });

    console.log('Status da resposta:', response.status);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dados recebidos:', data?.length || 0, 'posts');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro no proxy de busca:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' }, 
      { status: 500 }
    );
  }
} 