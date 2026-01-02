from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load model and vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

app = FastAPI(title="Fake News Detection API")

class NewsInput(BaseModel):
    text: str

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/predict")
def predict(news: NewsInput):
    X = vectorizer.transform([news.text])
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0].max()

    return {
        "label": int(pred),
        "label_name": "REAL" if pred == 1 else "FAKE",
        "confidence": round(float(prob), 4)
    }
@app.get("/")
def root():
    return {"message": "Fake News Detection API is running"}
