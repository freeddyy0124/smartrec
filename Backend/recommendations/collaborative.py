import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

class CollaborativeFilteringRecommender:
    def __init__(self, ratings_df, items_df):
        self.ratings_df = ratings_df
        self.items_df = items_df
        self.user_mapper, self.item_mapper, self.user_inverse_mapper, self.item_inverse_mapper = self._create_mappers()
        self.interaction_matrix = self._create_interaction_matrix()
        self.model_knn = self._fit_model()

    def _create_mappers(self):
        user_mapper = {user_id: index for index, user_id in enumerate(self.ratings_df['user_id'].unique())}
        item_mapper = {item_id: index for index, item_id in enumerate(self.ratings_df['parent_asin'].unique())}
        user_inverse_mapper = {v: k for k, v in user_mapper.items()}
        item_inverse_mapper = {v: k for k, v in item_mapper.items()}
        return user_mapper, item_mapper, user_inverse_mapper, item_inverse_mapper

    def _create_interaction_matrix(self):
        interaction_matrix = csr_matrix(
            (self.ratings_df['rating'].values,
             (self.ratings_df['user_id'].map(self.user_mapper),
              self.ratings_df['parent_asin'].map(self.item_mapper))),
            shape=(len(self.user_mapper), len(self.item_mapper))
        )
        return interaction_matrix

    def _fit_model(self):
        model_knn = NearestNeighbors(metric='cosine', algorithm='brute')
        model_knn.fit(self.interaction_matrix)
        return model_knn

    def get_recommendations(self, user_id, top_n=10):
        if user_id not in self.user_mapper:
            raise ValueError(f"User ID {user_id} is not found in the user_mapper.")

        user_index = self.user_mapper[user_id]
        distances, indices = self.model_knn.kneighbors(self.interaction_matrix.getrow(user_index), n_neighbors=top_n + 1)

        valid_indices = [idx for idx in indices.flatten() if idx in self.item_inverse_mapper and idx != user_index]
        rec_items_asin = [self.item_inverse_mapper[idx] for idx in valid_indices[:top_n]]

        detailed_rec_df = self.items_df[self.items_df['product_id'].isin(rec_items_asin)]
        return detailed_rec_df