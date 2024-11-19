import cv2
import numpy as np
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["FaceAuthDB"]
collection = db["PersonImages"]

# Path to the folder containing images for a specific person
person_id = "manisai3"  # Unique ID for each individual (change for each person)
image_paths = ["image7.jpg"]  # List of image file paths for the person

for img_path in image_paths:
    # Load image
    image = cv2.imread(img_path)
    if image is None:
        print(f"Failed to load image at {img_path}")
        continue
    # Encode image as JPEG to prepare for MongoDB storage
    _, buffer = cv2.imencode('.jpg', image)
    image_data = buffer.tobytes()

    # Insert image data into MongoDB with the associated person_id
    collection.insert_one({
        "person_id": person_id,
        "image_data": image_data
    })

print("Images stored in MongoDB for", person_id)
