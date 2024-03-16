class Config:
    """Base configuration."""
    SECRET_KEY = 'secretkey'
    MONGO_URI = 'mongodb://localhost:27017/smartrecs'
    JWT_SECRET_KEY = 'secretkey'

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False