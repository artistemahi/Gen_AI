from flask import Flask, request, jsonify
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import os

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')

try:
    nlp = spacy.load("en_core_web_sm")
except:
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Knowledge Base
KB_ITEMS = [
    {"question": "How to improve Python skills?", "answer": "Practice coding daily, contribute to open source, and build projects."},
    {"question": "What are in-demand careers in AI?", "answer": "Machine Learning Engineer, Data Scientist, MLOps Engineer, AI Product Manager."},
    {"question": "How to prepare for interviews?", "answer": "Research the company, practice common questions, and prepare STAR stories."},
    {"question": "What is corporate social responsibility?", "answer": "It is the ethical responsibility of businesses to contribute to society and environment."}
]

KB_EMBEDDINGS = model.encode([item["question"] for item in KB_ITEMS])

# Hobby-to-career mapping
HOBBY_CAREER_MAP = {
    "music": ["Sound Engineer", "Music Therapist", "Composer"],
    "art": ["Graphic Designer", "Animator", "Art Director"],
    "sports": ["Coach", "Sports Analyst", "Physiotherapist"],
    "technology": ["Software Developer", "Data Scientist", "AI Engineer"],
    "writing": ["Content Writer", "Editor", "Journalist"]
}

# Functions
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

# API Endpoints
@app.route("/api/ask", methods=["POST"])
def api_ask():
    data = request.json
    query = data.get("message", "")
    answer = get_best_answer(query)
    return jsonify({"reply": answer})

@app.route("/api/match", methods=["POST"])
def api_match():
    data = request.json
    query = data.get("message", "")
    answer = hobby_match(query)
    return jsonify({"reply": answer})

@app.route("/api/skillgap", methods=["POST"])
def api_skillgap():
    data = request.json
    query = data.get("message", "")
    return jsonify({"reply": f"Skill gap analysis for '{query}' is under development."})

if __name__ == "__main__":
    app.run(debug=True)
