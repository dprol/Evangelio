import json
import re

def parse_lyrics(lyrics):
    data = []
    paragraphs = re.split(r'\n\s*\n', lyrics.strip())  # Dividir en párrafos por líneas vacías
    for paragraph_text in paragraphs:
        paragraph = {'paragraph': []}
        lines = paragraph_text.strip().split('\n')  # Dividir en líneas
        for line in lines:
            line_data = []
            # Expresión regular para capturar acordes y texto, sin alterar espacios entre
            pattern = re.compile(r'(\[([^\]]+)\])?([^\[\]]+)')
            matches = pattern.findall(line)
            previous_chord = ''
            for match in matches:
                chord = match[1] or ''
                text = match[2]

                if chord or text:
                    line_data.append({
                        'text': text,
                        'chord': chord or previous_chord or ''
                    })
                    if chord:
                        previous_chord = chord

            if line_data:
                paragraph['paragraph'].append(line_data)
        if paragraph['paragraph']:
            data.append(paragraph)
    return data

# Leer las letras desde el archivo
with open('letras.txt', 'r', encoding='utf-8') as f:
    lyrics_with_chords = f.read()

# Procesar las letras para generar la estructura de datos
data = parse_lyrics(lyrics_with_chords)

# Guardar los datos en un archivo JSON
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
