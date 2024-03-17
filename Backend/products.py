from flask import Blueprint, jsonify, request
from models import ProductData, UserInteraction
from recommender.data_generator import DataProcessor
from recommender.hybrid_model import HybridRecommender
from flask_jwt_extended import jwt_required, get_jwt_identity
from recommender.collaborative_filtering import CollaborativeFilteringRecommender
from recommender.content_based import ContentBasedRecommender
from models import User

products_blueprint = Blueprint('products_blueprint', __name__)
data_processor = DataProcessor("products.csv")
product_data = ProductData("products.csv")  # Assuming your CSV file is named 'products_asos.csv'

@products_blueprint.route('/range', methods=['GET'])
@jwt_required()
def get_products():
    # Optional: Get query parameters for pagination, etc.
    start = request.args.get('start', 0, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    # Retrieve products using ProductData model
    products = product_data.get_products(start=start, limit=limit)
    return jsonify(products), 200

@products_blueprint.route('/id/<product_id>', methods=['GET'])
@jwt_required()
def get_product_by_id(product_id):
    product = product_data.get_product_by_id(product_id)
    if product:
        return product, 200
    else:
        return jsonify({'error': 'Product not found'}), 404

@products_blueprint.route('/category/<category>', methods=['GET'])
@jwt_required()
def get_products_by_category(category):
    # Optional: Get query parameters for pagination, etc.
    start = request.args.get('start', 0, type=int)
    limit = request.args.get('limit', 10, type=int)

    products = product_data.get_products_by_category(category, start=start, limit=limit)
    return jsonify(products), 200

def current_user():
    current_user_email = get_jwt_identity()
    if current_user_email:
        user = User.find_one({'email': current_user_email})
        if user:
            user_info = {
                'email': user['email'],
                'hst': user.get('hst', None),
                'verified': user.get('verified', False),
                # Include any other fields you want to return to the client
            }
            return jsonify({'currentUser': user_info}), 200
        else:
            # User not found in DB, but JWT was valid
            return jsonify({'currentUser': None, 'message': 'User not found.'}), 404
    else:
        # No user is currently signed in
        return jsonify({'currentUser': None}), 200

@products_blueprint.route('/log_interaction', methods=['POST'])
@jwt_required()
def log_interaction():
    user_id = get_jwt_identity()
    data = request.json
    product_id = data.get('product_id')
    added_to_cart = data.get('added_to_cart', False)

    if not product_id:
        return jsonify({'error': 'Missing product ID'}), 400

    # Log or update the interaction in the database
    UserInteraction.log_or_update_interaction(user_id, product_id, added_to_cart)

    return jsonify({'message': 'Product interaction logged successfully'}), 200

@products_blueprint.route('/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    user_id = get_jwt_identity()
    print(user_id)
    # Get real interaction data
    interactions_df = data_processor.get_interactions_df()

    # Initialize recommender models with real data
    cf_recommender = CollaborativeFilteringRecommender(interactions_df)
    cb_recommender = ContentBasedRecommender(data_processor.products_df)
    
    # Optionally, initialize a hybrid recommender
    hybrid_recommender = HybridRecommender(data_processor.products_df, interactions_df)
    
    # Generate recommendations (example using collaborative filtering)
    recommendations = cf_recommender.get_recommendations(user_id, top_n=10)
    
    # Convert recommendations to JSON response, etc.
    # This step will vary based on your specific application and data structure
    return jsonify(recommendations)