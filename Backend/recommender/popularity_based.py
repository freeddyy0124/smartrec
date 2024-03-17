import pandas as pd

class PopularityBasedRecommender:
    def __init__(self, interactions_df):
        self.interactions_df = interactions_df

    def get_most_added_to_cart_items(self, top_n=10):
        # Count how many times each item has been added to cart
        added_to_cart_counts = self.interactions_df[self.interactions_df['added_to_cart'] == True].groupby('product_id').size().reset_index(name='counts')

        # Join with item details to get more information about the items
        # Assuming you have a separate DataFrame with item details like `items_df`
        # added_to_cart_counts = added_to_cart_counts.merge(items_df[['id', 'name', 'category']], left_on='product_id', right_on='id', how='left')

        # Sort items by the count of added to cart in descending order and get the top N items
        top_items = added_to_cart_counts.sort_values(by='counts', ascending=False).head(top_n)

        return top_items

    def get_trending_items(self, period_days=30, top_n=10):
        # Assuming 'timestamp' in your interactions DataFrame is already a datetime type
        # If not, convert it using pd.to_datetime(interactions_df['timestamp'])
        recent_period = pd.Timestamp.now() - pd.Timedelta(days=period_days)
        recent_interactions = self.interactions_df[self.interactions_df['timestamp'] > recent_period]

        # Repeat the process for the most added to cart items in this recent period
        return self.get_most_added_to_cart_items(recent_interactions, top_n)