from PIL import Image
import os

def resize_images(directory_path, sizes=[(300, 300), (400, 400), (500, 500), (600, 600)]):
    """
    Resize all images in the specified directory to the given sizes and save them with new filenames.

    :param directory_path: Directory containing the image files.
    :param sizes: List of tuples containing the new sizes (width, height).
    """
    # Ensure the directory exists
    if not os.path.isdir(directory_path):
        print(f"Directory does not exist: {directory_path}")
        return

    # Iterate over all files in the directory
    for file_name in os.listdir(directory_path):
        file_path = os.path.join(directory_path, file_name)

        # Ensure it's a file
        if not os.path.isfile(file_path):
            continue

        try:
            # Open the image file
            with Image.open(file_path) as img:
                # Process each size
                for size in sizes:
                    # Resize the image
                    resized_img = img.resize(size, Image.LANCZOS)
                    
                    # Generate new file path
                    base_name, ext = os.path.splitext(file_name)
                    new_file_name = f"{base_name}_{size[0]}{ext}"
                    new_file_path = os.path.join(directory_path, "resized", new_file_name)
                    
                    # Save the resized image
                    resized_img.save(new_file_path)

                    print(f"Resized and saved: {new_file_path}")

        except Exception as e:
            print(f"Could not process {file_path}. Error: {e}")

if __name__ == "__main__":
    # Path to the directory containing images
    directory_path = "/home/marc-nafria/Documents/GitHub/marc-nafria.github.io/covers"

    # Resize all images in the directory to the specified sizes
    resize_images(directory_path)
