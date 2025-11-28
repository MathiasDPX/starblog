from flask import Flask, render_template, Response
import sass

app = Flask(__name__)


@app.route("/css/<path:name>.css")
def serve_scss(name):
    scss_path = f"static/scss/{name}.scss"
    css = sass.compile(filename=scss_path)
    return Response(css, mimetype="text/css")


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
