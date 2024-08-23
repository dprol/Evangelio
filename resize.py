from PIL import Image
import os

def resize_images(file_paths, new_size=(300, 300)):
    """
    Resize specified PNG images to the new size and save them with a new filename.

    :param file_paths: List of absolute paths to the image files.
    :param new_size: Tuple containing the new size (width, height).
    """
    for file_path in file_paths:

        # Ensure the file exists
        if not os.path.isfile(file_path):
            print(f"File does not exist: {file_path}")
            continue

        try:
            # Open the image file
            with Image.open(file_path) as img:
                # Resize the image
                resized_img = img.resize(new_size, Image.LANCZOS)
                
                # Generate new file path
                dir_path = os.path.dirname(file_path)
                base_name = os.path.basename(file_path)
                name, ext = os.path.splitext(base_name)
                new_file_name = f"{name}_low{ext}"
                new_file_path = os.path.join(dir_path, new_file_name)
                
                # Save the resized image
                resized_img.save(new_file_path)

                print(f"Resized and saved: {new_file_path}")

        except Exception as e:
            print(f"Could not process {file_path}. Error: {e}")

if __name__ == "__main__":
    # List of absolute paths to PNG images
    file_paths = [
        "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/01_Jaume_Complete.png",
        "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/Luis_Final.PNG",
        "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/portada_bck.jpg",  # Add more absolute paths as needed
        "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/Marco_Creu.PNG",
        "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/Luis_Puro.png",
        "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/Marco_Flor02.PNG"
    ]

    # Resize specified PNG images and save them with a '_low' suffix
    resize_images(file_paths)
