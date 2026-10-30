export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request);
    const ct = response.headers.get('content-type') || '';
    if (!ct.includes('text/html')) return response;
    const origin = new URL(request.url).origin;
    const ogImage = `${origin}/arvore.png`;
    return new HTMLRewriter().on('head', {
      element(el) {
        el.append(`
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:title" content="PonteLinks - Seus links em um só lugar" />
<meta property="og:description" content="Crie sua página de links personalizada" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${ogImage}" />
`, { html: true });
      }
    }).transform(response);
  }
}
