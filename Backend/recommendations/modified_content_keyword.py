import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity

class KeywordBasedRecommender:
    def __init__(self, items_df):
        self.items_df = items_df
        self.items_df['title'] = self.items_df['title'].astype(str)
        self.vectorizer = CountVectorizer(max_features=1000, min_df=0.01, max_df=0.95)
        self.svd_model = TruncatedSVD(n_components=50)
        self.item_profiles = self._create_item_profiles()

    def _create_item_profiles(self):
        count_matrix = self.vectorizer.fit_transform(self.items_df['title'])
        reduced_matrix = self.svd_model.fit_transform(count_matrix)
        item_profiles = pd.DataFrame(reduced_matrix, index=self.items_df.index)
        return item_profiles

    def get_recommendations_by_keyword(self, keyword, top_n=10):
        # Generate a query vector for the given keyword
        query_vector = self.vectorizer.transform([keyword])
        query_reduced = self.svd_model.transform(query_vector)

        # Compute cosine similarity between the query and all item profiles
        similarities = cosine_similarity(query_reduced, self.item_profiles)

        # Get indices of items sorted by similarity score
        similar_indices = similarities.argsort()[0][-top_n-1:-1][::-1]
        top_similar_items = self.items_df.index[similar_indices]

        return self.items_df.loc[top_similar_items]