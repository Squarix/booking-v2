import sys
import pandas as pd
import numpy as np

import json


from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer


from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics.pairwise import cosine_similarity
from django.shortcuts import render

from django.views import View

# Create your views here.

# pages/views.py
from django.http import HttpResponse


tfidf = TfidfVectorizer(stop_words='english')

metadata = pd.read_csv('description.csv', low_memory=False)
keywords = pd.read_csv('keywords.csv')

metadata['description'] = metadata['description'].fillna('')
keywords['keywords'] = keywords['keywords'].fillna('')

keywords['id'] = keywords['id'].astype('int')
metadata['id'] = metadata['id'].astype('int')

metadata = metadata.merge(keywords, on='id')

tfidf_matrix = tfidf.fit_transform(metadata['description'])
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
indices = pd.Series(metadata.index, index=metadata['id']).drop_duplicates()

def get_recommendations(id, cosine_sim=cosine_sim):
    # Get the index of the movie that matches the title
    idx = indices[id]

    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]

    # Get the movie indices
    hotel_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    return metadata['id'].iloc[hotel_indices]


def create_soup(x):
    return x['keywords'] + ' ' + x['description']

# Create a new soup feature
metadata['soup'] = metadata.apply(create_soup, axis=1)

count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(metadata['soup'])

cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

def homePageView(request):
    ids = request.GET.get('ids').split(',')
    response_data = {}
    for i in ids:
        response_data[i] = get_recommendations(int(i), cosine_sim2).head(5).to_json()

    return HttpResponse(json.dumps(response_data), content_type="application/json")