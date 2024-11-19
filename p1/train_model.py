from load_images import load_images_from_db
from cnn_model import create_cnn_model
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
import numpy as np

# Define person IDs
person_ids = ['cr', 'kotra', 'shasha','manisai','manisai1','manisai2','manisai3']  # List of all person IDs
X, y = [], []

for i, person_id in enumerate(person_ids):
    images = load_images_from_db(person_id)
    if images.size == 0:
        print(f"No images found for person_id: {person_id}")
    else:
        print(f"Loaded {len(images)} images for person_id: {person_id}")
    labels = np.full(len(images), i)
    X.extend(images)
    y.extend(labels)

X = np.array(X) / 255.0
y = to_categorical(np.array(y), num_classes=len(person_ids))

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = create_cnn_model(num_classes=len(person_ids))
model.fit(X_train, y_train, epochs=60, batch_size=32, validation_data=(X_test, y_test))

model.save("face_auth_model.h5")


