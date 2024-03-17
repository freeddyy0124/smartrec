import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import ast

class ContentBasedRecommender:
    def __init__(self, items_df):
        self.items_df = items_df
        # Preprocess descriptions into a single string per product
        self.items_df['combined_description'] = self.items_df['description'].apply(lambda x: self._combine_description(ast.literal_eval(x)))
        self.item_profiles = self._create_item_profiles()
        self.item_similarity_matrix = self._calculate_similarity()

    def _combine_description(self, description_list):
        combined = " ".join(d['Product Details'] for d in description_list if 'Product Details' in d)
        return combined

    def _create_item_profiles(self):
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf_vectorizer.fit_transform(self.items_df['combined_description'])
        item_profiles = pd.DataFrame(tfidf_matrix.toarray(), index=self.items_df['id'], columns=tfidf_vectorizer.get_feature_names_out())
        return item_profiles

    def _calculate_similarity(self):
        # Calculate the cosine similarity matrix
        cosine_sim_matrix = pd.DataFrame(cosine_similarity(self.item_profiles),
                                         index=self.item_profiles.index,
                                         columns=self.item_profiles.index)
        return cosine_sim_matrix

    def get_recommendations(self, product_id, top_n=10):
        # Get the similarity scores for the item
        item_similarities = self.item_similarity_matrix[product_id]
        # Sort the items based on the similarity scores
        similar_items = item_similarities.sort_values(ascending=False)
        # Exclude the item itself from the recommendation
        similar_items = similar_items[similar_items.index != product_id]
        # Get the top N similar items
        top_similar_items = similar_items.head(top_n).index
        return top_similar_items.tolist()