from flask import Flask, render_template, request
import requests
import os

app = Flask(__name__)

NASA_API_KEY = 'ZorD3706pzCbZRdxcIpjEAPckB4ePoLqwrZUgumE'

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/astronomy_vs_astrology')
def astronomy_vs_astrology():
    return render_template('astronomy_vs_astrology.html')

@app.route('/solar_system')
def solar_system():
    return render_template('solar_system.html')

@app.route('/light')
def light():
    return render_template('light.html')

@app.route('/star_dust')
def star_dust():
    return render_template('star_dust.html')

# For the Astronomy Picture of the Day (APOD) page
@app.route('/apod')
def apod():
    response = requests.get(f'https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}')
    apod_data = response.json()
    return render_template('apod.html', apod_data=apod_data)


if __name__ == '__main__':
    app.run(debug=True)
