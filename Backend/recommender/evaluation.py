def compute_coverage(recommended_items, catalog_items):
    """
    Compute the coverage of the recommendation system.
    Coverage is defined as the ratio of recommended items to the total number of items in the catalog.

    :param recommended_items: a list of item IDs recommended by the system
    :param catalog_items: a list of all item IDs in the item catalog
    :return: coverage value as a float
    """
    recommended_set = set(recommended_items)
    catalog_set = set(catalog_items)
    coverage = len(recommended_set.intersection(catalog_set)) / len(catalog_set)
    return coverage

def jaccard_similarity(set1, set2):
    """
    Compute the Jaccard similarity between two sets.

    :param set1: First set
    :param set2: Second set
    :return: Jaccard similarity score
    """
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union if union != 0 else 0

def compute_diversity(recommendations):
    """
    Compute the diversity of recommendations across users.
    Diversity is calculated based on the Jaccard similarity between recommendation lists of different users.

    :param recommendations: a dictionary where keys are user IDs and values are lists of recommended item IDs
    :return: diversity value as a float
    """
    user_pairs = list(combinations(recommendations.keys(), 2))
    similarity_sum = sum(jaccard_similarity(set(recommendations[user1]), set(recommendations[user2])) for user1, user2 in user_pairs)
    diversity = 1 - (similarity_sum / len(user_pairs)) if user_pairs else 1
    return diversity