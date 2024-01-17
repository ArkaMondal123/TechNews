from flask_cors import CORS
from newsapi.newsapi_client import NewsApiClient
from textblob import TextBlob
from flask import Flask, jsonify

newsapi = NewsApiClient(api_key = 'enter key')
print(newsapi)

app = Flask(__name__)
CORS(app)


@app.route('/search/<string:query>', methods = ["POST"])
def search(query):
    top_headlines = newsapi.get_top_headlines(q= query,
                                              category='technology',
                                              language='en')
    for i, article in enumerate(top_headlines["articles"]):
        try:
            data = TextBlob(article["content"]).sentiment.polarity
            top_headlines["articles"][i]["Sentiment"] = data
        except:
            top_headlines["articles"][i]["Sentiment"] = 0
    return jsonify({"Results" : sorted(top_headlines["articles"], key = lambda x: x["Sentiment"], reverse = True)})

@app.route('/multisearch/<string:queries>', methods = ["POST"])
def multisearch(queries):
    queries = str(queries).split(",")
    top_headlines = []
    for query in queries:
        headlines = newsapi.get_top_headlines(q= query,
                                              category='technology',
                                              language='en')
        for i, article in enumerate(headlines["articles"]):
            try:
                data = TextBlob(article["content"]).sentiment.polarity
                headlines["articles"][i]["Sentiment"] = data
            except:
                headlines["articles"][i]["Sentiment"] = 0
            if headlines["articles"][i] not in top_headlines:
                top_headlines.append(headlines["articles"][i])
    return jsonify({"Results" : sorted(top_headlines, key = lambda x: x["Sentiment"], reverse = True)})


if __name__ == '__main__':
    app.run()
