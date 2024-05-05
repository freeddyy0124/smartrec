import pandas as pd

class PopularityBasedRecommender:
    def __init__(self, items_df):
        self.items_df = items_df
        self.popular_products = self._get_popular_products()

    def _get_popular_products(self):
        popular_products_df = self.items_df.drop_duplicates(subset='product_id')
        return popular_products_df

    def get_recommendations(self, top_n=10):
        return self.popular_products.sort_values(by='count', ascending=False).head(top_n)
    
    # Just return the asked product simply
    def get_product(self, product_id):
        return self.items_df[self.items_df['product_id'] == product_id]
    