from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import json
import os
import uuid

app = Flask(__name__)
CORS(app) 

USER_DATA_FILE = 'data/users.json'
EXPENSES_DATA_FILE = 'data/expenses.json'

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

def load_expenses():
    """Load expenses from the JSON file."""
    if os.path.exists(EXPENSES_DATA_FILE):
        with open(EXPENSES_DATA_FILE, 'r') as file:
            return json.load(file)
    return {}

def save_expenses(expenses):
    """Save expenses to the JSON file."""
    with open(EXPENSES_DATA_FILE, 'w') as file:
        json.dump(expenses, file)

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
            return jsonify({'success': True, 'message': 'Login successful!', 'user_id': user['user_id']})

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

    # Hash the password and save the new user with a unique ID
    hashed_password = generate_password_hash(password)
    user_id = str(uuid.uuid4())
    users.append({'user_id': user_id, 'username': username, 'password': hashed_password})
    save_users(users)

    return jsonify({'success': True, 'message': 'User registered successfully!', 'user_id': user_id})

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'User ID is required'}), 400

    expenses = load_expenses()
    user_expenses = expenses.get(user_id, [])

    return jsonify({'success': True, 'expenses': user_expenses})

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    user_id = data.get('userId')
    description = data.get('description')
    amount = data.get('amount')
    date = data.get('date')

    if not all([user_id, description, amount, date]):
        return jsonify({'success': False, 'message': 'Missing data'}), 400

    expenses = load_expenses()

    # If the user already has expenses, check for the same description
    if user_id in expenses:
        user_expenses = expenses[user_id]
        existing_expense = next((expense for expense in user_expenses if expense['description'] == description), None)

        if existing_expense:
            # If expense with the same description exists, update the amount
            existing_expense['amount'] += amount
        else:
            # If no matching description is found, add a new expense
            new_expense = {
                'id': str(uuid.uuid4()),
                'description': description,
                'amount': amount,
                'date': date
            }
            user_expenses.append(new_expense)
    else:
        # If the user has no expenses, create a new entry for them
        expenses[user_id] = [{
            'id': str(uuid.uuid4()),
            'description': description,
            'amount': amount,
            'date': date
        }]

    # Save the updated expenses data
    save_expenses(expenses)

    return jsonify({'success': True, 'message': 'Expense added/updated successfully'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
