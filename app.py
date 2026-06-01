from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load the trained model, scaler, and feature names
try:
    model = joblib.load('best_model.pkl')
    scaler = joblib.load('scaler.pkl')
    feature_names = joblib.load('feature_names.pkl')
except FileNotFoundError as e:
    print(f"Error loading model files: {e}")
    model = None
    scaler = None
    feature_names = None

@app.route('/')
def home():
    """Render the home page"""
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    """API endpoint to make predictions"""
    try:
        data = request.json
        
        # Extract input values
        distance = float(data.get('distance', 0))
        total_stops = float(data.get('total_stops', 0))
        departure_hour = float(data.get('departure_hour', 12))  # Default to noon (12:00)
        
        # Validate inputs
        if distance < 0 or total_stops < 0:
            return jsonify({'error': 'Distance and Total_Stops must be non-negative'}), 400
        if departure_hour < 0 or departure_hour > 23:
            return jsonify({'error': 'Departure hour must be between 0 and 23'}), 400
        
        if model is None or scaler is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Create feature array with the 3 core features
        # Features: [Total_Distance, Total_Stops, Departure_Hour]
        features = np.array([[distance, total_stops, departure_hour]])
        
        # Scale features using the loaded scaler
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        
        # Ensure prediction is non-negative
        if prediction < 0:
            prediction = 0
        
        # Round to 2 decimal places
        prediction = round(prediction, 2)
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'input': {
                'distance': distance,
                'total_stops': total_stops,
                'departure_hour': departure_hour
            }
        })
    
    except ValueError as e:
        return jsonify({'error': f'Invalid input: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Prediction error: {str(e)}'}), 500

@app.route('/api/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        'model_name': 'Rail Journey Estimator',
        'features': ['Total_Distance', 'Total_Stops', 'Departure_Hour'],
        'output': 'Journey Duration (Minutes)'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
