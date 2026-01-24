const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

module.exports = (req, res) => {
  let pathname = req.url;

  // Remover query string
  if (pathname.includes('?')) {
    pathname = pathname.split('?')[0];
  }

  // Remover barra inicial
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Rotear URLs /whatsapp-{slug} e /review-{slug} para os templates
  if (pathname.match(/^\/whatsapp-(.+)$/)) {
    pathname = '/pages/whatsapp.html';
  } else if (pathname.match(/^\/review-(.+)$/)) {
    pathname = '/pages/review.html';
  }

  // Construir caminho do arquivo
  let filePath;

  // Se for um arquivo em /pages/, servir da raiz
  if (pathname.startsWith('/pages/')) {
    filePath = path.join(__dirname, '..', pathname);
  } 
  // Se for um arquivo em /data/, /css/, /js/, /logos, servir de public
  else if (pathname.startsWith('/data/') || pathname.startsWith('/css/') || pathname.startsWith('/js/') || pathname.startsWith('/logos/')) {
    filePath = path.join(__dirname, '..', 'public', pathname);
  }
  // Outros arquivos estáticos também de public
  else {
    filePath = path.join(__dirname, '..', 'public', pathname);
  }

  // Verificar se arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Página não encontrada</h1>');
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h1>500 - Erro interno do servidor</h1>');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    }
  });
};
