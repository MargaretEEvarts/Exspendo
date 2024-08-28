from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import json
import os

app = Flask(__name__)
CORS(app) 

USER_DATA_FILE = 'data/users.json'

def load_users():
    """Load users from the JSON file."""
    if os.path.exists(USER_DATA_FILE):
        with open(USER_DATA_FILE, 'r') as file:
            data = json.load(file)
            return data['users']
    return []

def save_users(users):
    """Save users to the JSON file."""
    with open(USER_DATA_FILE, 'w') as file:
        json.dump({"users": users}, file)

@app.route('/')
def home():
    return "default"

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    users = load_users()

    # Validate user
    for user in users:
        if user['username'] == username and check_password_hash(user['password'], password):
            return jsonify({'success': True, 'message': 'Login successful!'})

    return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    users = load_users()

    # Check if user already exists
    for user in users:
        if user['username'] == username:
            return jsonify({'success': False, 'message': 'User already exists'}), 400

    # Hash the password and save the new user
    hashed_password = generate_password_hash(password)
    users.append({'username': username, 'password': hashed_password})
    save_users(users)

    return jsonify({'success': True, 'message': 'User registered successfully!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
