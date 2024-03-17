import pandas as pd
from pymongo import MongoClient

class DataProcessor:
    def __init__(self, products_file, mongo_uri="mongodb://localhost:27017/smartrecs"):
        self.products_file = products_file
        self.client = MongoClient(mongo_uri)
        self.db = self.client.smartrecs  # Adjusted to the correct database name
        self.products_df = self.load_product_data()
    
    def load_product_data(self):
        # Load product data from a CSV file
        products_df = pd.read_csv(self.products_file)
        return products_df
    
    def get_interactions_df(self):
        # Fetch interaction data from MongoDB
        interactions = list(self.db.user_interactions.find({}))
        interactions_df = pd.DataFrame(interactions)
        return interactions_df