---
name: game-canvas-pwa
description: Padrões de desenvolvimento para jogos web 2D/3D (Canvas, PixiJS, Three.js), loops de renderização desacoplados a 60 FPS, gerenciamento de áudio, touch controls e Progressive Web Apps (PWAs) 100% instaláveis e offline.
---

# Skill: Web Game Engine & Offline PWA Architecture

Esta skill define a engenharia para construção de jogos web de alto desempenho, interatividade gráfica com Canvas/WebGL e conversão para Progressive Web Apps (PWA) instaláveis com funcionamento autônomo offline.

---

## 1. GAME LOOP PROFISSIONAL (DELTA TIME DESACOPLADO)

Nunca baseie a física ou animações do jogo na taxa fixa de quadros do monitor; utilize sempre o *delta time*:

```javascript
class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.lastTime = 0;
    this.accumulator = 0;
    this.timeStep = 1000 / 60; // 60 updates por segundo fixos na física
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    const deltaTime = Math.min(currentTime - this.lastTime, 250); // Trava anti-spiral of death
    this.lastTime = currentTime;
    this.accumulator += deltaTime;

    // Física determinística com passo fixo
    while (this.accumulator >= this.timeStep) {
      this.update(this.timeStep / 1000);
      this.accumulator -= this.timeStep;
    }

    // Renderização suave interpolada
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    // Atualiza posições dos personagens, colisões e estados
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Desenha entidades, mapas e efeitos visuais
  }
}
```

---

## 2. ARQUITETURA PWA OFFLINE (SERVICE WORKER)

Garante que o jogo ou aplicativo web continue funcionando perfeitamente sem conexão com a internet:

### Registro do Service Worker (`main.js`):
```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('PWA ServiceWorker registrado:', reg.scope))
      .catch(err => console.error('Falha no SW:', err));
  });
}
```

### Script do Service Worker (`sw.js` - Cache First para Assets):
```javascript
const CACHE_NAME = 'app-game-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/engine.js',
  '/assets/sprites.png',
  '/assets/audio/theme.mp3',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(networkRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkRes.clone());
          return networkRes;
        });
      });
    }).catch(() => caches.match('/index.html'))
  );
});
```

---

## 3. WEB APP MANIFEST PADRONIZADO (`manifest.json`)

Torna o aplicativo instalável no Android, iOS e Desktop como app nativo:

```json
{
  "name": "Super Space Quest PWA",
  "short_name": "SpaceQuest",
  "description": "Jogo de ação espacial arcade de alta performance",
  "start_url": "/",
  "display": "standalone",
  "orientation": "landscape-primary",
  "background_color": "#0B0F17",
  "theme_color": "#6366F1",
  "icons": [
    {
      "src": "/assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## 4. CONTROLES VIRTUAIS TOUCH (TOUCHPAD / ANALÓGICO VIRTUAL)

Suporte nativo para jogabilidade mobile sem teclado:

- Escuta eventos `touchstart`, `touchmove`, `touchend` com `passive: false` para evitar scrolling indesejado.
- Cálculo polar de raio e ângulo para movimentação 360° analógica ou 4/8 direções.
- Prevenção de gestos de pinça (zoom) e pull-to-refresh através de CSS `touch-action: none`.

---

## 5. REGRAS DE PERFORMANCE & OTIMIZAÇÃO

1. **Sprite Sheets**: Sempre agrupe imagens em um único atlas de texturas para reduzir draw calls.
2. **Audio Pool**: Pré-carregue buffers de áudio com `AudioContext` para evitar latência no disparo de efeitos sonoros.
3. **Garbage Collection (GC)**: Reutilize objetos em vetores de entidades (*Object Pooling*) em vez de instanciar novos objetos `new Bullet()` a cada tiro disparado.
