# 🚄 Rail Journey Estimator - Web Application

A machine learning-powered web application that predicts train journey duration based on distance and number of stops. Built with Flask, scikit-learn, and a modern responsive UI.

## Features

✨ **Key Features:**
- 🎯 **Real-time Predictions**: Get instant journey duration estimates
- 🏃 **Fast & Responsive**: Modern web interface with smooth animations
- 📱 **Mobile-Friendly**: Fully responsive design works on all devices
- 🔍 **Transparent**: Shows model information and how predictions are made
- 📊 **Trained Model**: Uses an optimized machine learning model trained on historical railway data

## Prerequisites

Before running the application, ensure you have:
- Python 3.8 or higher
- pip (Python package manager)
- The trained model files:
  - `best_model.pkl` - Trained ML model
  - `scaler.pkl` - Feature scaler
  - `feature_names.pkl` - Feature names

## Installation & Setup

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Verify Model Files

Ensure the following files exist in the project directory:
```
rail-journey-estimator/
├── best_model.pkl
├── scaler.pkl
├── feature_names.pkl
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

### Step 3: Run the Application

```bash
python app.py
```

The application will start on `http://localhost:5000`

## Usage

1. **Open the Web Page**: Navigate to `http://localhost:5000` in your browser
2. **Enter Journey Details**:
   - **Distance (km)**: Total distance the train will travel
   - **Total Stops**: Number of stations where the train will stop
3. **Get Prediction**: Click "Predict Duration" to get the estimated journey time
4. **View Results**: The prediction is displayed in hours and minutes format

### Example Predictions

| Distance (km) | Total Stops | Estimated Duration |
|---|---|---|
| 100 | 5 | ~2.5 hours |
| 300 | 10 | ~5.8 hours |
| 500 | 15 | ~9.2 hours |

*Note: These are example values. Actual predictions depend on the trained model.*

## API Endpoints

### POST `/api/predict`

Make a prediction request.

**Request Body:**
```json
{
  "distance": 250,
  "total_stops": 8
}
```

**Response:**
```json
{
  "success": true,
  "prediction": 450.75,
  "input": {
    "distance": 250,
    "total_stops": 8
  }
}
```

**Status Codes:**
- `200`: Successful prediction
- `400`: Invalid input
- `500`: Server error

### GET `/api/model-info`

Get information about the model.

**Response:**
```json
{
  "model_name": "Rail Journey Estimator",
  "features": ["Distance", "Total_Stops"],
  "output": "Journey Duration (Minutes)"
}
```

## Model Information

### Features Used
- **Distance**: Total kilometers to be covered
- **Total Stops**: Number of stations the train stops at

### Output
- **Journey Duration**: Estimated time in minutes

### Model Performance
- Based on historical railway journey data
- Optimized using multiple regression algorithms
- Cross-validated for reliability and accuracy

## Project Structure

```
rail-journey-estimator/
├── app.py                    # Flask application
├── requirements.txt          # Python dependencies
├── best_model.pkl           # Trained ML model
├── scaler.pkl              # Feature scaler
├── feature_names.pkl       # Feature names
├── templates/
│   └── index.html          # Web interface
├── static/
│   ├── style.css           # Styling
│   └── script.js           # Client-side logic
├── pkm.ipynb               # Jupyter notebook with analysis
├── Dataset1.csv            # Original dataset
└── train_features_cleaned.csv # Processed training data
```

## Technology Stack

- **Backend**: Flask (Python web framework)
- **Machine Learning**: scikit-learn
- **Data Processing**: pandas, numpy
- **Model Serialization**: joblib
- **Frontend**: HTML5, CSS3, vanilla JavaScript
- **Styling**: Custom CSS with gradients and animations

## Troubleshooting

### Application won't start
- Check that Python 3.8+ is installed: `python --version`
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Ensure port 5000 is not in use

### "Model files not found" error
- Verify `best_model.pkl`, `scaler.pkl`, and `feature_names.pkl` exist in the project root
- Ensure the notebook was run to generate these files
- Check file paths in `app.py`

### Prediction errors
- Ensure input values are non-negative numbers
- Check that the scaler and model files are not corrupted
- Review console output for specific error messages

## Development

### Running in Debug Mode

The app already runs in debug mode. To modify:

```python
# In app.py
if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### Running on a Different Port

```python
# In app.py
app.run(debug=True, port=8000)
```

Then access at `http://localhost:8000`

## Performance Notes

- Predictions are computed in < 100ms
- Suitable for real-time applications
- Can handle concurrent requests efficiently

## License

This project is provided as-is for educational and research purposes.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the console output for error messages
3. Verify all model files are present and accessible
4. Ensure requirements are properly installed

---

**Happy Predicting! 🚄✨**
