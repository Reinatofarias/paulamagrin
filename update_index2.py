import re

html_path = r"E:\Origo\Desenvolvimento\Paula Magrin Terapeuta\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The new carousel lines
new_carousel_lines = """            <div class="coverflow-track" id="coverflow-track">
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
            </div>
"""

# Convert string to list of lines to insert
new_lines = [line + '\\n' for line in new_carousel_lines.split('\\n')]
new_lines = new_lines[:-1] # drop trailing newline

# Find the start of the carousel
carousel_start_idx = -1
for i, line in enumerate(lines):
    if 'id="coverflow-track"' in line:
        carousel_start_idx = i
        break

if carousel_start_idx != -1:
    # Find the end of the carousel
    # We expect 24 slides, each has 3 lines, plus track wrapper.
    # We will just look for the closing </div> of coverflow-track
    # which is followed by <!-- Controls -->
    carousel_end_idx = -1
    for i in range(carousel_start_idx + 1, len(lines)):
        if '<!-- Controls -->' in lines[i]:
            carousel_end_idx = i - 2 # The </div> and blank line
            break

    if carousel_end_idx != -1:
        lines = lines[:carousel_start_idx] + new_lines + lines[carousel_end_idx+1:]
        print("Replaced carousel.")


# Now we find and remove the audio elements exactly by finding their start and end lines.
# Relato de Reconstrução
def remove_audio_card(title_pattern):
    global lines
    start_idx = -1
    for i, line in enumerate(lines):
        if 'class="audio-card"' in line:
            # Check next 15 lines if it has the title
            has_title = False
            for j in range(i, min(i+15, len(lines))):
                if title_pattern in lines[j]:
                    has_title = True
                    break
            
            if has_title:
                start_idx = i
                break
    
    if start_idx != -1:
        # Find closing </article>
        end_idx = -1
        for j in range(start_idx, len(lines)):
            if '</article>' in lines[j]:
                end_idx = j
                break
        
        if end_idx != -1:
            lines = lines[:start_idx-1] + lines[end_idx+1:]
            print(f"Removed audio card with {title_pattern}.")


remove_audio_card("Relato de Reconstrução e Posicionamento")
remove_audio_card("Consciência, Limites e Próxima Fase")

with open(html_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Done writing to file.")
