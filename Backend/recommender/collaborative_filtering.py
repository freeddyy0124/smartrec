import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

class CollaborativeFilteringRecommender:
    def __init__(self, interactions_df):
        self.interactions_df = interactions_df
        # Create a binary user-item interaction matrix
        self.user_item_matrix = self._create_interaction_matrix()

    def _create_interaction_matrix(self):
        # Convert 'added_to_cart' to binary values, 1 for True and 0 for False
        interactions = self.interactions_df.groupby(['user_id', 'product_id'])['added_to_cart'].any().astype(int).reset_index()
        interaction_matrix = interactions.pivot(index='user_id', columns='product_id', values='added_to_cart').fillna(0)
        return interaction_matrix

    def get_recommendations(self, user_id, top_n=10):
        # Get the similarity scores between the target user and all other users
        user_similarity_matrix = cosine_similarity(self.user_item_matrix)
        user_index = self.user_item_matrix.index.tolist().index(user_id)
        user_similarity_scores = user_similarity_matrix[user_index]

        # Get the indices of the top N similar users (excluding the target user itself)
        similar_users_indices = user_similarity_scores.argsort()[-top_n-1:-1][::-1]

        # Get the products that the similar users have added to cart
        recommended_products = set()
        for idx in similar_users_indices:
            similar_user_id = self.user_item_matrix.index[idx]
            products_added_to_cart = self.user_item_matrix.loc[similar_user_id]
            products_added_to_cart = products_added_to_cart[products_added_to_cart > 0].index.tolist()
            recommended_products.update(products_added_to_cart)

        # Remove the products that the target user has already added to cart
        products_already_added = set(self.user_item_matrix.loc[user_id][self.user_item_matrix.loc[user_id] > 0].index)
        recommended_products.difference_update(products_already_added)

        return list(recommended_products)[:top_n]