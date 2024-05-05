import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity

class CategoryBasedRecommender:
    def __init__(self, items_df):
        self.items_df = items_df.set_index('product_id')
        self.items_df['title'] = self.items_df['title'].astype(str)
        self.item_profiles = self._create_item_profiles()

    def _create_item_profiles(self):
        count_vectorizer = CountVectorizer(max_features=500, min_df=0.01, max_df=0.95)
        count_matrix = count_vectorizer.fit_transform(self.items_df['title'])
        
        svd = TruncatedSVD(n_components=100)
        reduced_matrix = svd.fit_transform(count_matrix)
        
        item_profiles = pd.DataFrame(reduced_matrix, index=self.items_df.index)
        return item_profiles

    def get_recommendations(self, product_id, top_n=10):
        if product_id not in self.item_profiles.index:
            return pd.DataFrame()  # Return an empty DataFrame if product_id is not found

        product_profile = self.item_profiles.loc[product_id].values.reshape(1, -1)
        similarities = cosine_similarity(product_profile, self.item_profiles)
        
        similar_indices = similarities.argsort()[0][-top_n-1:-1][::-1]
        top_similar_items = self.items_df.index[similar_indices]
        
        top_similar_items = [item for item in top_similar_items if item != product_id]
        return self.items_df.loc[top_similar_items]