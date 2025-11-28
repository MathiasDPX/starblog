from flask import Flask, render_template, Response, render_template_string, abort
from glob import glob
import sass

app = Flask(__name__)

posts = {}
for post in glob("posts/*.html"):
    content = open(post, "r", encoding="utf-8").read()
    title = post.replace("posts\\", "")
    title = title.replace(".html", "")

    print(f"Found post {title}")
    posts[title] = content


@app.route("/css/<path:name>.css")
def serve_scss(name):
    scss_path = f"static/scss/{name}.scss"
    css = sass.compile(filename=scss_path)
    return Response(css, mimetype="text/css")


@app.route("/p/<string:name>")
def serve_post(name):
    content = posts.get(name)
    
    if content == None:
        return abort(404)
    
    return render_template_string(content)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
