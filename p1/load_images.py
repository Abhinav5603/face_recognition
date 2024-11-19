from pymongo import MongoClient
import cv2
import numpy as np

client = MongoClient("mongodb://localhost:27017/")
db = client["FaceAuthDB"]
collection = db["PersonImages"]

def load_images_from_db(person_id):
    images = []
    for img_data in collection.find({"person_id": person_id}):
        np_img = np.frombuffer(img_data['image_data'], np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (128, 128))
        images.append(img)
    return np.array(images)
