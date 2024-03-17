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


class UserInteraction:
    @staticmethod
    def log_or_update_interaction(user_id, product_id, added_to_cart = False):
        # Check if an interaction for this user and product already exists
        interaction = mongo.db.user_interactions.find_one({
            "user_id": user_id,
            "product_id": product_id
        })

        if interaction:
            # Update the existing interaction
            update_data = {
                "timestamp": datetime.utcnow(),
                "added_to_cart": interaction.get("added_to_cart", False) or added_to_cart
            }
            mongo.db.user_interactions.update_one(
                {"_id": interaction["_id"]},
                {"$set": update_data}
            )
        else:
            # Create a new interaction
            new_interaction = {
                "_id": ObjectId(),
                "user_id": user_id,
                "product_id": product_id,
                "timestamp": datetime.utcnow(),
                "added_to_cart": added_to_cart
            }
            mongo.db.user_interactions.insert_one(new_interaction)