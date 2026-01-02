# Fake News Detection System  
AI-Based Text Classification using TF-IDF & Logistic Regression

---

## 1. Introduction
The rapid growth of social media and online news platforms has made it increasingly difficult to distinguish between **real** and **fake** news. Fake news can spread misinformation, manipulate public opinion, and cause social harm.

This project presents an **AI-based Fake News Detection System** that automatically classifies news statements as **FAKE** or **REAL** using **Machine Learning** techniques.  
Along with the AI model, a **web-based application** has been developed to allow users to interact with the system in a simple and user-friendly manner.

---

## 2. Project Objectives
- To design and train a Machine Learning model for fake news detection  
- To apply **Natural Language Processing (NLP)** techniques for text analysis  
- To classify news articles into **FAKE** or **REAL** categories  
- To develop a web application for real-time prediction  
- To integrate AI model inference with a backend API  

---

## 3. AI & Machine Learning Approach

### 3.1 Problem Type
- **Binary Classification**
  - `0` → Fake News  
  - `1` → Real News  

---

### 3.2 Text Preprocessing
Before training the model, the news text undergoes the following preprocessing steps:

- Lowercasing text
- Removing punctuation and special characters
- Removing stopwords
- Tokenization
- Vectorization using TF-IDF

---

### 3.3 Feature Extraction – TF-IDF
**TF-IDF (Term Frequency–Inverse Document Frequency)** is used to convert text into numerical form.

It:
- Assigns higher weight to important words
- Reduces the impact of common words
- Helps the model learn meaningful patterns from text

---

### 3.4 Classification Model – Logistic Regression
**Logistic Regression** is used as the classification algorithm because:
- It is efficient for text classification
- Works well with TF-IDF features
- Is interpretable and fast
- Performs well on large text datasets

The model learns patterns that differentiate fake news from real news based on word usage and frequency.

---

### 3.5 Model Training
- The model is trained offline using Python and Scikit-learn
- After training, the model is saved using `joblib`
- The trained model and vectorizer are reused for predictions without retraining

---

## 4. Datasets Used
Two publicly available datasets were used:

1. **ISOT Fake News Dataset**
   - Language: English
   - Contains labeled fake and real news articles

2. **RUFND Dataset**
   - Language: Roman Urdu
   - Enables multilingual fake news detection

The datasets are merged and cleaned before training.

---

## 5. Model Outputs
For each input news statement, the model returns:
- **Prediction:** FAKE or REAL
- **Confidence Score:** Probability of prediction correctness

---

## 6. Web Application Overview
To make the AI model accessible, a **web-based interface** is developed.

### User Flow:
1. User enters a news statement on the website
2. The request is sent to the backend
3. Backend forwards the request to the AI model API
4. The model predicts the result
5. The prediction and confidence score are shown on the website

---

## 7. System Architecture
The system follows a **three-tier architecture**:

1. **Frontend (React)**
   - User interface
   - Sends user input to backend
   - Displays AI predictions

2. **Backend (Node.js + Express)**
   - Handles API requests
   - Acts as a bridge between frontend and AI service

3. **AI Service (FastAPI)**
   - Loads trained ML model
   - Performs inference
   - Returns predictions

---

## 8. Technology Stack

### AI / Machine Learning
- Python
- Scikit-learn
- TF-IDF Vectorizer
- Logistic Regression
- Joblib

### Backend
- Node.js
- Express.js
- Axios

### Frontend
- React (Vite)
- HTML
- CSS

---

## 9. Project Structure


client/ (React Frontend)
├── src/
│   ├── components/           Reusable UI components
│   ├── pages/                Main screens/pages
│   ├── services/             API service calls
│   ├── App.jsx               Root component
│   └── main.jsx              Entry point
├── index.html
├── package.json
└── vite.config.js

server/ (Node.js Backend)
├── server.js                 Express server entry point
├── package.json
└── node_modules/

fake-news-api/ (FastAPI ML Service)
├── app.py                    FastAPI application
├── model.pkl                 Trained ML model
├── vectorizer.pkl            TF-IDF vectorizer
├── requirements.txt
└── __pycache__/

fake-news.ipynb               Model training notebook (Kaggle / Colab)
README.md                     Project documentation
.gitignore
