from flask import Flask, render_template
import json
import pandas as pd


app = Flask(__name__)


@app.route("/")
def index():
    df = pd.read_csv('static/data/covid_data.csv').drop(['Name of State / UT', 'Total Confirmed cases (Indian National)', 'Total Confirmed cases ( Foreign National )', 'Latitude', 'Longitude'], axis=1)
    df = df.groupby(df['Date'],as_index=False).sum().tail(30)
    df = df.rename({'Cured/Discharged/Migrated':"cured",'Total Confirmed cases':'confirmed'}, axis='columns')
    chart_data = df.to_dict(orient='records')
    chart_data = json.dumps(chart_data)
    chart_data = json.loads(chart_data)
    data = {'chart_data': chart_data}
    return render_template("graph.html", data=data)


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)