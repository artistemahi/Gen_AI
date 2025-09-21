from flask import Flask, request, jsonify
from flask_cors import CORS  # You'll need to install flask-cors package
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = SentenceTransformer('all-MiniLM-L6-v2')

try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

KB_ITEMS = [
    {"question": "How to improve Python skills?", "answer": "Practice coding daily, contribute to open source, and build projects."},
    {"question": "What are in-demand careers in AI?", "answer": "Machine Learning Engineer, Data Scientist, MLOps Engineer, AI Product Manager."},
    {"question": "How to prepare for interviews?", "answer": "Research the company, practice common questions, and prepare STAR stories."},
    {"question": "What is corporate social responsibility?", "answer": "It is the ethical responsibility of businesses to contribute to society and environment."}
]

KB_EMBEDDINGS = model.encode([item["question"] for item in KB_ITEMS])

HOBBY_CAREER_MAP = {
    "music": ["Sound Engineer", "Music Therapist", "Composer"],
    "art": ["Graphic Designer", "Animator", "Art Director"],
    "sports": ["Coach", "Sports Analyst", "Physiotherapist"],
    "technology": ["Software Developer", "Data Scientist", "AI Engineer"],
    "writing": ["Content Writer", "Editor", "Journalist"]
}

def get_best_answer(query):
    query_emb = model.encode([query])
    sims = cosine_similarity(query_emb, KB_EMBEDDINGS)[0]
    idx = int(np.argmax(sims))
    return KB_ITEMS[idx]["answer"]

def hobby_match(hobby):
    hobby = hobby.lower()
    for key in HOBBY_CAREER_MAP:
        if key in hobby:
            return f"Based on your interest in {key}, possible careers are: {', '.join(HOBBY_CAREER_MAP[key])}."
    return "I couldn't find a direct match, but exploring related industries could be valuable."

@app.route("/api/ask", methods=["POST"])
def api_ask():
    data = request.json
    query = data.get("query", "")
    answer = get_best_answer(query)
    return jsonify({"answer": answer})

@app.route("/api/match", methods=["POST"])
def api_match():
    data = request.json
    query = data.get("query", "")
    answer = hobby_match(query)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
