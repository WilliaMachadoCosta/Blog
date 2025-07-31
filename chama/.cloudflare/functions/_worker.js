export default {
  async fetch(request, env, ctx) {
    // Configuração para Edge Runtime
    return new Response('Edge Runtime configured', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}; 