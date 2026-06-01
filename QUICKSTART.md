# 🚀 Quick Start Guide

## 1️⃣ Install Dependencies

Make sure you're in the virtual environment and install required packages:

```powershell
pip install -r requirements.txt
```

## 2️⃣ Verify Model Files Exist

Before running the app, ensure these files are in the project directory:
- ✅ `best_model.pkl`
- ✅ `scaler.pkl`  
- ✅ `feature_names.pkl`

If you need to generate them, run the Jupyter notebook (`pkm.ipynb`) first.

## 3️⃣ Run the Web Application

```powershell
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

## 4️⃣ Open in Browser

Open your browser and go to:
```
http://localhost:5000
```

## 5️⃣ Make Your First Prediction

1. Enter **Distance** (e.g., 150 km)
2. Enter **Total Stops** (e.g., 5)
3. Click **"Predict Duration"**
4. See the estimated journey time! 🎯

## 📁 Project Layout

```
rail-journey-estimator/
├── 📄 app.py                    ← Main Flask application
├── 📄 pkm.ipynb                 ← Model training notebook
├── 📄 requirements.txt           ← Python packages
├── 📄 README.md                 ← Full documentation
├── 📄 QUICKSTART.md             ← This file
├── 🎨 templates/
│   └── 📄 index.html            ← Web page
└── 🎨 static/
    ├── 📄 style.css             ← Styling
    └── 📄 script.js             ← Interactivity
```

## 🔧 Stopping the Server

Press `Ctrl + C` in the terminal where the app is running.

## ⚙️ Modify Settings

To change the port (e.g., from 5000 to 8000), edit `app.py`:

```python
if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Change port here
```

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| "Port 5000 in use" | Change port number in `app.py` |
| "Module not found" | Run `pip install -r requirements.txt` |
| "Model files not found" | Run the notebook to generate them |
| "Connection refused" | Check if app is running on the correct port |

## 📊 Testing the API

Use `curl` or Postman to test the API:

```bash
# Request
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d "{\"distance\": 200, \"total_stops\": 7}"

# Response
{"success": true, "prediction": 385.42, "input": {"distance": 200, "total_stops": 7}}
```

---

**That's it! You're ready to predict journey durations! 🚄**
