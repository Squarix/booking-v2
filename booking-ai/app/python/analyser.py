from sklearn.feature_extraction.text import CountVectorizer

def create_soup(x):
    return ' '.join(x['description']) + ' ' + ' '.join(x['predictions']) + ' ' + x['cost'])

features = ['description', 'predictions', 'cost']
for feature in features:
    metadata[feature] = metadata[feature].apply(get_list)

count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(metadata['soup'])

