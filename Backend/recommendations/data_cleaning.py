import pandas as pd

def load_and_clean_data():
    # Load the data from the CSV files
    items_df = pd.read_csv('data/data.csv')
    items_df1 = pd.read_csv('data/appliances.csv')

    # Group and count reviews
    review_counts = items_df1.groupby('parent_asin').size().reset_index(name='count')

    # Merge and clean data
    items_df = items_df.merge(review_counts, on='parent_asin', how='left')
    items_df['count'] = items_df['count'].fillna(0)
    items_df['user_satisfaction_proxy'] = items_df['average_rating'].apply(lambda x: 1 if x >= 3.5 else 0)
    items_df = items_df.dropna(subset=['price'])
    items_df = items_df.drop_duplicates(subset=['parent_asin'])
    items_df = items_df.rename(columns={'parent_asin': 'product_id'})
    items_df = items_df.dropna()
    items_df['count'] = items_df['count'].astype(int)

    return items_df, items_df1
