import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const author = searchParams.get('author');
  const slug = searchParams.get('slug');
  const per_page = searchParams.get('per_page') || '15';
  
  try {
    let apiUrl = 'https://api.chamanozap.net/wp-json/wp/v2/posts?_embed&orderby=date&order=desc';
    
    if (slug) {
      apiUrl = `https://api.chamanozap.net/wp-json/wp/v2/posts?slug=${slug}&_embed`;
    } else {
      if (category) {
        // Se for uma string, tentar buscar por slug primeiro
        if (isNaN(Number(category))) {
          // Buscar categoria por slug
          const categoryResponse = await fetch(`https://api.chamanozap.net/wp-json/wp/v2/categories?slug=${category}`);
          const categoryData = await categoryResponse.json();
          
          if (categoryData && categoryData.length > 0) {
            apiUrl += `&categories=${categoryData[0].id}`;
          }
        } else {
          apiUrl += `&categories=${category}`;
        }
      }
      
      if (author) {
        apiUrl += `&author=${author}`;
      }
      
      apiUrl += `&per_page=${per_page}`;
    }
    
    console.log('Fazendo proxy para posts:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'ChamaNoZap-Blog/1.0',
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache por 5 minutos
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro no proxy de posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' }, 
      { status: 500 }
    );
  }
} 