# 📰 Fake News Detection System +TF-IDF + Logistic Regression+FastAPI ML service

An AI-based Fake News Detection system that classifies news statements as **FAKE** or **REAL** using Machine Learning.  
The project integrates **TF-IDF + Logistic Regression**, a **FastAPI ML service**, a **Node.js backend**, and a **React frontend**.

---

## 🚀 Features
- Classifies news as **FAKE** or **REAL**
- Displays confidence score for predictions
- Supports **English and Roman Urdu** text
- Simple and modern user interface
- REST API-based architecture

---

## 🧠 Machine Learning Model
- **Algorithm:** Logistic Regression  
- **Text Vectorization:** TF-IDF  
- **Datasets Used:**
  - ISOT Fake News Dataset (English)
  - RUFND Dataset (Roman Urdu)

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- CSS (Modern UI)

### Backend
- Node.js
- Express.js
- Axios

### ML Service
- Python
- FastAPI
- Scikit-learn
- Joblib

---

## 🔄 System Architecture
1. User enters a news claim in the frontend.
2. Frontend sends the request to the Node.js backend.
3. Node.js forwards the request to the FastAPI ML service.
4. The ML model predicts **FAKE** or **REAL** with confidence.
5. The result is returned to the frontend and displayed to the user.

--- 
## Project Structure

FWD(SemProj)/
├── client/          # React frontend
├── server/          # Node.js backend
├── fake-news-api/   # FastAPI ML service
├── fake-news.ipynb  # Training notebook
└── README.md

--------
## API Endpoints

### FastAPI
POST /predict

Input:
{ "text": "News claim" }

### Node.js
POST /api/fake-news
------
## How to Run the Project

### Run ML Service
cd fake-news-api
pip install -r requirements.txt
uvicorn app:app --reload --port 8001

### Run Backend
cd server
npm install
node server.js

### Run Frontend
cd client
npm install
npm run dev

-----
## Limitations
- The model is pattern-based, not a real-time fact checker.
- Outdated true statements may be classified as fake.

------
## Future Improvements
- Integrate live fact-check APIs
- Improve model accuracy with deep learning
- Add multilingual support


-----







## 📁 Project Structure

