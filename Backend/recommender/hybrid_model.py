from recommender.content_based import ContentBasedRecommender
from recommender.collaborative_filtering import CollaborativeFilteringRecommender

class HybridRecommender:
    def __init__(self, items_df, interactions_df, content_based_weight=0.5, collaborative_filtering_weight=0.5):
        self.content_based_recommender = ContentBasedRecommender(items_df)
        self.collaborative_filtering_recommender = CollaborativeFilteringRecommender(interactions_df)
        self.content_based_weight = content_based_weight
        self.collaborative_filtering_weight = collaborative_filtering_weight

    def get_recommendations(self, user_id, top_n=10):
        # Get recommendations from both models
        content_based_recommendations = self.content_based_recommender.get_recommendations(user_id, top_n)
        collaborative_filtering_recommendations = self.collaborative_filtering_recommender.get_recommendations(user_id, top_n)

        # Combine the recommendations with weights
        recommendations = {}
        for item in content_based_recommendations:
            recommendations[item] = recommendations.get(item, 0) + self.content_based_weight
        for item in collaborative_filtering_recommendations:
            recommendations[item] = recommendations.get(item, 0) + self.collaborative_filtering_weight

        # Sort and select top N recommendations
        sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
        top_recommendations = [item[0] for item in sorted_recommendations[:top_n]]

        return top_recommendations