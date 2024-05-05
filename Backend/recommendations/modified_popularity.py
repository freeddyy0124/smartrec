import pandas as pd
import ast  # Necessary for converting string representations of lists into actual lists

class ModifiedPopularityBasedRecommender:
    def __init__(self, items_df):
        self.items_df = items_df
        # Filter products that have at least one review
        self.popular_products = self.items_df[self.items_df['count'] > 0].drop_duplicates(subset='product_id')

    def get_similar_popular_products(self, product_id, top_n=10):
        # Extract categories of the given product_id
        product_categories = self.items_df.loc[self.items_df['product_id'] == product_id, 'categories'].values[0]
        
        # Ensure product_categories is a list
        if isinstance(product_categories, str):
            product_categories = ast.literal_eval(product_categories)

        # Filter products with matching categories
        similar_products = self.popular_products[
            self.popular_products['categories'].apply(
                lambda x: any(item in product_categories for item in ast.literal_eval(x))
            )
        ]

        # Sort by 'count' to get the most popular items, excluding the queried product
        recommendations = similar_products.sort_values(by='count', ascending=False)
        recommendations = recommendations[recommendations['product_id'] != product_id]

        return recommendations.head(top_n)