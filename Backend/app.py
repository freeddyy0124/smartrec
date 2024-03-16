from flask import Flask
from flask_jwt_extended import JWTManager
from auth import auth_blueprint
from products import products_blueprint
from extensions import bcrypt, mongo
from config import DevelopmentConfig  # Assuming you have a DevelopmentConfig class

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    bcrypt.init_app(app)
    mongo.init_app(app)
    jwt = JWTManager(app)

    # Configure application to store JWTs in cookies
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
    app.config['JWT_COOKIE_CSRF_PROTECT'] = True

    # Register blueprints
    app.register_blueprint(auth_blueprint, url_prefix='/api/users')
    app.register_blueprint(products_blueprint, url_prefix='/api/products')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()