from flask import Blueprint, jsonify, request
from models import ProductData
from models import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from recommendations.popularity import PopularityBasedRecommender
from recommendations.data_cleaning import load_and_clean_data
from recommendations.modified_popularity import ModifiedPopularityBasedRecommender
from recommendations.content_based import CategoryBasedRecommender
from recommendations.modified_content_keyword import KeywordBasedRecommender
from recommendations.collaborative import CollaborativeFilteringRecommender
import pandas as pd

products_blueprint = Blueprint('products_blueprint', __name__)
items_df, items_df1 = load_and_clean_data()
popularity_recommender = PopularityBasedRecommender(items_df)
modified_popularity_recommender = ModifiedPopularityBasedRecommender(items_df)
content_recommender = CategoryBasedRecommender(items_df)
keyword_recommender = KeywordBasedRecommender(items_df)
collaborative_recommender = CollaborativeFilteringRecommender(items_df1, items_df)



@products_blueprint.route('/popular', methods=['GET'])
def popular_products():
    top_n = request.args.get('top_n', 30, type=int) 
    recommendations = popularity_recommender.get_recommendations(top_n)
    return jsonify(recommendations.to_dict(orient='records')), 200

@products_blueprint.route('/similarpopular/<product_id>', methods=['GET'])
def similar_popular_products(product_id):
    top_n = request.args.get('n', 30, type=int)
    
    # Check if product ID is provided (though it will always be provided since it's part of the URL)
    if not product_id:
        return jsonify({'error': 'Product ID is required'}), 400

    recommendations = modified_popularity_recommender.get_similar_popular_products(product_id, top_n)
    if recommendations.empty:
        return jsonify({'message': 'No similar products found or invalid product ID'}), 404
    
    return jsonify(recommendations.to_dict(orient='records')), 200

@products_blueprint.route('/contentbased/<product_id>', methods=['GET'])
def content_based_recommendations(product_id):
    top_n = request.args.get('n', 30, type=int)

    try:
        recommendations = content_recommender.get_recommendations(product_id, top_n)
        if recommendations.empty:
            return jsonify({'message': 'No recommendations found'}), 404
        return jsonify(recommendations.to_dict(orient='records')), 200
    except KeyError:
        return jsonify({'error': 'Product ID not found'}), 404
    
    
@products_blueprint.route('/search/<keyword>', methods=['GET'])
def search_products(keyword):
    top_n = request.args.get('n', 30, type=int)
    try:
        recommendations = keyword_recommender.get_recommendations_by_keyword(keyword, top_n)
        return jsonify(recommendations.to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@products_blueprint.route('/product/<id>', methods=['GET'])
def search_product(id):
    try:
        product = popularity_recommender.get_product(id)
        return jsonify(product.to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


    
@products_blueprint.route('/collaborative', methods=['GET'])
def collaborative_filtering():
    user_id = 'AGKHLEW2SOWHNMFQIJGBECAF7INQ'
    top_n = 30
    try:
        recommendations = collaborative_recommender.get_recommendations(user_id, top_n)
        return jsonify(recommendations.to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
    
@products_blueprint.route('/hybrid/<id>/<key>', methods=['GET'])
def hybrid_recommendations(id, key):
    # Use user_id and product_id to get recommendations using content-based, modified popularity, and collaborative filtering
    # Check for any duplicate recommendations and return a combined list of recommendations
    # In the list sort the recommendations in this order - content-based, modified popularity, collaborative filtering
    # Get 12 recommendations from content-based, 10 from modified popularity, and 8 from collaborative filtering
    print(key)
    top_n = request.args.get('n', 30, type=int)
    user_id = 'AGKHLEW2SOWHNMFQIJGBECAF7INQ'
    try:
        modified_content_based_recommendations = keyword_recommender.get_recommendations_by_keyword(key, 10)
        content_based_recommendations = content_recommender.get_recommendations(id, 14)
        modified_popularity_recommendations = modified_popularity_recommender.get_similar_popular_products(id, 10)
        collaborative_recommendations = collaborative_recommender.get_recommendations(user_id, 18)
        combined_recommendations = pd.concat([modified_content_based_recommendations, content_based_recommendations, modified_popularity_recommendations, collaborative_recommendations])
        combined_recommendations = combined_recommendations.drop_duplicates(subset='product_id')
        # console.log number of recs for each type
        print("Modified content-based recommendations: ", len(modified_content_based_recommendations))
        print("Content-based recommendations: ", len(content_based_recommendations))
        print("Modified popularity recommendations: ", len(modified_popularity_recommendations))
        print("Collaborative filtering recommendations: ", len(collaborative_recommendations))
        combined_recommendations = combined_recommendations.dropna()
        print("Combined recommendations: ", len(combined_recommendations))
        return jsonify(combined_recommendations.to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404
    

    

