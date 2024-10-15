from PIL import Image
import os

def resize_and_convert_images(directory_path, sizes=[(300, 300), (400, 400), (500, 500)]):
    """
    Redimensiona todas las imágenes PNG en el directorio especificado a los tamaños dados,
    las convierte a JPG y las guarda con nuevos nombres de archivo.

    :param directory_path: Directorio que contiene los archivos de imagen.
    :param sizes: Lista de tuplas que contienen los nuevos tamaños (ancho, alto).
    """
    # Verifica que el directorio existe
    if not os.path.isdir(directory_path):
        print(f"El directorio no existe: {directory_path}")
        return

    # Crea un directorio para las imágenes redimensionadas si no existe
    output_dir = os.path.join(directory_path, "resized")
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Itera sobre todos los archivos en el directorio
    for file_name in os.listdir(directory_path):
        file_path = os.path.join(directory_path, file_name)

        # Asegura que es un archivo y tiene extensión PNG
        if not os.path.isfile(file_path) or not file_name.lower().endswith('.png'):
            continue

        try:
            # Abre el archivo de imagen
            with Image.open(file_path) as img:
                # Convierte la imagen a RGB para eliminar el canal alfa
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and 'transparency' in img.info):
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[-1])  # Pega con la máscara alfa
                    img = background
                else:
                    img = img.convert("RGB")

                # Procesa cada tamaño
                for size in sizes:
                    # Redimensiona la imagen
                    resized_img = img.resize(size, Image.LANCZOS)

                    # Genera el nuevo nombre de archivo
                    base_name, _ = os.path.splitext(file_name)
                    new_file_name = f"{base_name}_{size[0]}.jpg"
                    new_file_path = os.path.join(output_dir, new_file_name)

                    # Guarda la imagen redimensionada en formato JPG
                    resized_img.save(new_file_path, "JPEG", quality=95)

                    print(f"Redimensionado y guardado: {new_file_path}")

        except Exception as e:
            print(f"No se pudo procesar {file_path}. Error: {e}")

if __name__ == "__main__":
    # Ruta al directorio que contiene las imágenes
    directory_path = "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/covers"

    # Redimensiona y convierte todas las imágenes PNG en el directorio a los tamaños especificados
    resize_and_convert_images(directory_path)
