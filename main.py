from flask import Flask, render_template, Response, render_template_string, abort
from feedgen.feed import FeedGenerator
from urllib.parse import urljoin
import toml
import sass
import os

with open('config.toml', 'r', encoding='utf-8') as f:
    config = toml.loads(f.read())

app = Flask(__name__)
fg = FeedGenerator()

fg.title(config['feed']['title'])
fg.id(config['feed']['id'])
fg.link(href=config['feed']['link'], rel='alternate')
fg.description(config['feed']['description'])
fg.logo(urljoin(config['feed']['link'], 'favicon.png'))

posts = {}
for id, info in config["articles"].items():
    fe = fg.add_entry()
    fe.id(id)
    fe.title(info['title'])
    fe.description(info.get('description'))

    content = open(os.path.join("posts", info['path']), "r", encoding="utf-8").read()
    title = info['title']

    posts[title] = content


@app.route("/atom.xml")
def serve_atom():
    data = fg.atom_str()
    return Response(data, mimetype="application/atom+xml")

@app.route("/rss.xml")
def serve_rss():
    data = fg.rss_str()
    return Response(data, mimetype="application/rss+xml")

@app.route("/css/<path:name>.css")
def serve_scss(name):
    scss_path = f"static/scss/{name}.scss"
    css = sass.compile(filename=scss_path)
    return Response(css, mimetype="text/css")


@app.route("/archives")
def archives():    
    return render_template("archives.html", posts=list(posts.keys()))


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
