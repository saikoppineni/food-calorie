from flask import Flask, request, jsonify
import tensorflow as tf
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
from pyngrok import ngrok
from index_to_class import indexToClass
import requests

app = Flask(__name__)
CORS(app)
# Load the pre-trained model
model = tf.keras.models.load_model('model_mobilenetv2.keras',compile=False)

# Define a route to handle prediction requests
@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        #Get the image data from the request
        file = request.files['image']
        
        # Read image file
        img = Image.open(io.BytesIO(file.read()))
        
        # Resize image to desired dimensions
        img = img.resize((224, 224))
        
        # Preprocess the image for input to the model
        img_array = np.array(img) / 255.0  # Normalize pixel values
        
        # Make prediction
        prediction = model.predict(np.expand_dims(img_array, axis=0))
        print(prediction)
        class_label = np.argmax(prediction)
        query = indexToClass.indexToClass(int(class_label))
        # You may need to further process the prediction as needed
        # The URL of the API you want to send a POST request to
        url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

        # The data you want to send
        data = {
        'query': query.replace("_", " ")
        }

     # The headers for the request
        headers = {
        'Content-Type': 'application/json',
        'x-app-id': '60908732',
        'x-app-key': '89eb4e8c388185addcff0729cf8fa25a'
        }

        # Send the POST request
        response = requests.post(url, json=data, headers=headers)

        # Return the response text
        return response.json()

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    public_url = ngrok.connect(5000)
    print(' * Tunnel URL:', public_url)
    app.run(debug=True,port=5000)  # Run Flask app on port 5000
    ngrok.kill()