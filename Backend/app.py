from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth_blueprint
from products import products_blueprint
from extensions import bcrypt, mongo
from config import DevelopmentConfig
from datetime import timedelta

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # JWT Configuration
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_SECURE'] = True  # Should be True in production if using HTTPS
    app.config['JWT_COOKIE_CSRF_PROTECT'] = True  # Enable CSRF protection which means cookies should be set with the Secure flag in production
    app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=120)  # Access token expires in 1 hour
    # set same site to strict to prevent CSRF attacks
    app.config['JWT_COOKIE_SAMESITE'] = 'Strict'
    

    # Enable CORS for all domains
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"], expose_headers=['Content-Type', 'X-CSRFToken'], allow_headers=['Content-Type', 'X-CSRFToken'])

    # Initialize extensions
    bcrypt.init_app(app)
    mongo.init_app(app)
    jwt = JWTManager(app)

    # Register blueprints
    app.register_blueprint(auth_blueprint, url_prefix='/api/users')
    app.register_blueprint(products_blueprint, url_prefix='/api/products')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)