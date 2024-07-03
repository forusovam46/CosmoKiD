from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solar_system')
def solar_system():
    return render_template('solar_system.html')

@app.route('/milky_way')
def milky_way():
    return render_template('milky_way.html')

@app.route('/eclipses')
def eclipses():
    return render_template('eclipses.html')

if __name__ == '__main__':
    app.run(debug=True)
