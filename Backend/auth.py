from flask import Blueprint, request, jsonify, current_app, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies
from models import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import bcrypt

auth_blueprint = Blueprint('auth_blueprint', __name__)

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    existing_user = User.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'User already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    User.create(email, hashed_password)

    # Create JWT token for the new user
    access_token = create_access_token(identity=email)
    response = jsonify({'message': 'User created successfully'})
    set_access_cookies(response, access_token)  # Set JWT in cookies

    return response, 201

@auth_blueprint.route('/signin', methods=['POST'])
def signin():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Please provide email and password'}), 400

    existingUser = User.find_one({'email': email})
    if not existingUser:
        return jsonify({'error': 'Invalid Credentials'}), 400

    if bcrypt.check_password_hash(existingUser['password'], password):
        access_token = create_access_token(identity=email)
        response = jsonify({'message': 'User signed in successfully'})
        set_access_cookies(response, access_token)
        return response, 200
    else:
        return jsonify({'error': 'Invalid Credentials'}), 400


@auth_blueprint.route('/signout', methods=['POST'])
def signout():
    response = jsonify({'message': 'User signed out successfully'})
    response.set_cookie('access_token_cookie', '', expires=0)  # Clear JWT cookie
    return response, 200

def current_user():
    current_user_email = get_jwt_identity()
    if current_user_email:
        user = User.find_one({'email': current_user_email})
        if user:
            user_info = {
                'email': user['email'],
                'hst': user.get('hst', None),
                'verified': user.get('verified', False),
                # Include any other fields you want to return to the client
            }
            return jsonify({'currentUser': user_info}), 200
        else:
            # User not found in DB, but JWT was valid
            return jsonify({'currentUser': None, 'message': 'User not found.'}), 404
    else:
        # No user is currently signed in
        return jsonify({'currentUser': None}), 200
    
@auth_blueprint.route('/currentuser', methods=['GET'])
@jwt_required()
def get_current_user():
    return current_user()

@auth_blueprint.route('/', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello, World!'})