from flask import Blueprint, jsonify, request
from models import ProductData, UserInteraction
from flask_jwt_extended import jwt_required, get_jwt_identity

products_blueprint = Blueprint('products_blueprint', __name__)
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

@products_blueprint.route('/interaction', methods=['POST'])
@jwt_required()
def log_interaction():
    user_id = get_jwt_identity()
    data = request.json
    product_id = data.get('product_id')
    view_duration = data.get('view_duration')
    added_to_cart = data.get('added_to_cart', False)

    if not product_id or view_duration is None:
        return jsonify({'error': 'Missing product_id or view_duration'}), 400

    # Log or update the interaction in the database
    UserInteraction.log_or_update_interaction(
        user_id, product_id, view_duration, added_to_cart
    )

    return jsonify({'message': 'Interaction logged successfully'}), 200