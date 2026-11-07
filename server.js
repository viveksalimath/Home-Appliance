const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));

const SHOP_DIR = path.join(__dirname, 'shop.ttkprestige.com');

// Middleware to mock API endpoints and silence tracking beacons
app.use((req, res, next) => {
  // Customer section load mock
  if (req.path.startsWith('/customer/section/load')) {
    const customerFile = path.join(SHOP_DIR, 'customer/section/load/index.html');
    if (fs.existsSync(customerFile)) {
      res.setHeader('Content-Type', 'application/json');
      return res.sendFile(customerFile);
    }
  }

  // Cross-sell products mock
  if (req.path.startsWith('/ajaxmincart/ajax/crosssellproducts')) {
    const crosssellFile = path.join(SHOP_DIR, 'ajaxmincart/ajax/crosssellproducts.html');
    if (fs.existsSync(crosssellFile)) {
      res.setHeader('Content-Type', 'application/json');
      return res.sendFile(crosssellFile);
    }
  }

  // Swatches media mock
  if (req.path.startsWith('/swatches/ajax/media')) {
    const swatchesFile = path.join(SHOP_DIR, 'swatches/ajax/media/index.html');
    if (fs.existsSync(swatchesFile)) {
      res.setHeader('Content-Type', 'application/json');
      return res.sendFile(swatchesFile);
    }
  }

  // Tracking / analytics endpoints to prevent 404 console spam
  if (
    req.path.includes('/g/collect') ||
    req.path.includes('/j/collect') ||
    req.path.includes('/ccm/') ||
    req.path.includes('/pagead/') ||
    req.path.includes('/events') ||
    req.path.includes('/tr/') ||
    req.path.includes('/report/') ||
    req.path.includes('/collect')
  ) {
    return res.status(204).end();
  }

  next();
});

// Serve index.html at root with rewritten URLs so all assets load locally
app.get(['/', '/index.html'], (req, res) => {
  const indexPath = path.join(SHOP_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('shop.ttkprestige.com/index.html not found');
  }

  let html = fs.readFileSync(indexPath, 'utf8');

  // Rewrite absolute URLs of shop.ttkprestige.com to local paths
  html = html.replace(/https:\/\/shop\.ttkprestige\.com\//g, '/');
  html = html.replace(/https:\\\/\\\/shop\.ttkprestige\.com\\\//g, '\\/');

  // Rewrite external domains saved locally
  html = html.replace(/https:\/\/video\.lively\.li\//g, '/video.lively.li/');
  html = html.replace(/https:\/\/code\.ionicframework\.com\//g, '/code.ionicframework.com/');
  html = html.replace(/https:\/\/unpkg\.com\//g, '/unpkg.com/');
  html = html.replace(/https:\/\/fonts\.googleapis\.com\/css\?family=Hind:300,400/g, '/fonts.googleapis.com/css.css');
  html = html.replace(/https:\/\/fonts\.googleapis\.com\/css/g, '/fonts.googleapis.com/css.css');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// Support /media/.renditions path directly
app.use('/media/.renditions', express.static(path.join(SHOP_DIR, 'media/renditions')));

// Serve primary shop.ttkprestige.com static assets
app.use(express.static(SHOP_DIR));

// Serve other mirrored domain folders from the root directory
app.use(express.static(__dirname));

// Fallback for html pages or unknown assets
app.use((req, res) => {
  let target = path.join(SHOP_DIR, req.path);
  if (fs.existsSync(target) && fs.statSync(target).isFile()) {
    return res.sendFile(target);
  }
  target = path.join(__dirname, req.path);
  if (fs.existsSync(target) && fs.statSync(target).isFile()) {
    return res.sendFile(target);
  }
  res.status(404).send(`File not found: ${req.path}`);
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` Metalora Storefront Running`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Serving assets from: ${SHOP_DIR}`);
  console.log(`=================================================`);
});
