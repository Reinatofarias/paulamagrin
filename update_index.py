import re

html_path = r"E:\Origo\Desenvolvimento\Paula Magrin Terapeuta\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_carousel = """            <div class="coverflow-track" id="coverflow-track">
              <div class="coverflow-slide" data-index="0">
                <img src="Depoimentos/Depoimentos%20escritos/webp/Depoimento%20Adriana%20Constante.webp" data-full-src="Depoimentos/Depoimentos%20escritos/Depoimento%20Adriana%20Constante.png" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="1">
                <img src="Depoimentos/Depoimentos%20escritos/webp/Depoimento%20Caroline%20Murari.webp" data-full-src="Depoimentos/Depoimentos%20escritos/Depoimento%20Caroline%20Murari.png" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="2">
                <img src="Depoimentos/Depoimentos%20escritos/webp/Depoimento%20Giovana.webp" data-full-src="Depoimentos/Depoimentos%20escritos/Depoimento%20Giovana.png" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="3">
                <img src="Depoimentos/Depoimentos%20escritos/webp/Depoimento%20Luciana%20Rosa.webp" data-full-src="Depoimentos/Depoimentos%20escritos/Depoimento%20Luciana%20Rosa.png" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="4">
                <img src="Depoimentos/Depoimentos%20escritos/webp/Depoimento%20Taluia%20S%C3%A3o%20Paulo.webp" data-full-src="Depoimentos/Depoimentos%20escritos/Depoimento%20Taluia%20S%C3%A3o%20Paulo.png" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="5">
                <img src="Depoimentos/Depoimentos%20escritos/webp/PHOTO-2024-05-28-21-09-55.webp" data-full-src="Depoimentos/Depoimentos%20escritos/PHOTO-2024-05-28-21-09-55.jpg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="6">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.10.31.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.10.31.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="7">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.10.39.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.10.39.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="8">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.10.43.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.10.43.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="9">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.10.50.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.10.50.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="10">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.11.08.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.11.08.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="11">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.11.14.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.11.14.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="12">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.11.29.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.11.29.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
              <div class="coverflow-slide" data-index="13">
                <img src="Depoimentos/Depoimentos%20escritos/webp/WhatsApp%20Image%202026-09-02%20at%2022.11.44.webp" data-full-src="Depoimentos/Depoimentos%20escritos/WhatsApp%20Image%202026-09-02%20at%2022.11.44.jpeg" alt="Print de depoimento" loading="lazy">
              </div>
            </div>"""

content = re.sub(r'            <div class="coverflow-track" id="coverflow-track">.*?            </div>', new_carousel, content, flags=re.DOTALL)

# Audio testimonials removal
audio1 = """          <article class="audio-card">
            <button type="button" class="audio-card__play-btn" aria-label="Tocar depoimento em áudio">
              <svg class="icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <svg class="icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <div class="audio-card__content">
              <div class="audio-card__header">
                <h4 class="audio-card__title">Relato de Reconstrução e Posicionamento</h4>
                <span class="audio-card__duration">Áudio</span>
              </div>
              <div class="audio-card__progress-container">
                <div class="audio-card__progress-fill"></div>
              </div>
              <span class="audio-card__meta">Áudio enviado por WhatsApp · Empresária</span>
            </div>
            <audio class="audio-card__native" src="Depoimentos/Depoimentos%20falados/AUDIO-2026-07-02-11-20-08.m4a" preload="metadata"></audio>
          </article>"""

audio2 = """          <article class="audio-card">
            <button type="button" class="audio-card__play-btn" aria-label="Tocar depoimento em áudio">
              <svg class="icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <svg class="icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <div class="audio-card__content">
              <div class="audio-card__header">
                <h4 class="audio-card__title">Consciência, Limites e Próxima Fase</h4>
                <span class="audio-card__duration">Áudio</span>
              </div>
              <div class="audio-card__progress-container">
                <div class="audio-card__progress-fill"></div>
              </div>
              <span class="audio-card__meta">Áudio enviado por WhatsApp · Empresária</span>
            </div>
            <audio class="audio-card__native" src="Depoimentos/Depoimentos%20falados/AUDIO-2026-07-02-11-20-08(1).m4a" preload="metadata"></audio>
          </article>"""

content = content.replace(audio1, "").replace(audio2, "")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
