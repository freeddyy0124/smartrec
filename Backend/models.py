from extensions import mongo
import pandas as pd
from datetime import datetime
from bson import ObjectId

# Constants for roles, similar to your Role object in Node.js
class Role:
    BUYER = 141206
    SELLER = 141207
    ADMIN = 141208

class User:
    @staticmethod
    def find_one(query):
        return mongo.db.users.find_one(query)

    @staticmethod
    def create(email, password, role=Role.BUYER, verified=False):
        # Hash password
        hashed_password = password

        # Insert user document into MongoDB
        user_id = mongo.db.users.insert_one({
            'email': email,
            'password': hashed_password,
            'hst': role,
            'verified': verified
        }).inserted_id
        
        return user_id

    # Additional methods for user model can be added here, such as for validation, updating user details, etc.
class ProductData:
    def __init__(self, csv_file = "products.csv"):
        self.df = pd.read_csv(csv_file)

    def get_product_by_id(self, product_id):
        product = self.df[self.df['id'] == product_id]
        return product.to_json(orient='records')
    
    def get_products(self, start = 0, limit = 10):
        products = self.df[start:start+limit]
        return products.to_json(orient='records')
    
    def get_products_by_ids(self, ids):
        products = self.df[self.df['id'].isin(ids)]
        return products.to_json(orient='records')
    
    def get_products_by_category(self, category, start = 0, limit = 10):
        products = self.df[self.df['category'] == category]
        return products[start:start+limit].to_json(orient='records')

