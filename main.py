from flask import Flask, render_template, Response, render_template_string, abort
from feedgen.feed import FeedGenerator
from urllib.parse import urljoin
from markdown2 import Markdown
import toml
import sass
import os

with open('config.toml', 'r', encoding='utf-8') as f:
    config = toml.loads(f.read())

app = Flask(__name__)
fg = FeedGenerator()
markdowner = Markdown(extras=["fenced-code-blocks", "pygments"])

fg.title(config['feed']['title'])
fg.id(config['feed']['id'])
fg.link(href=config['feed']['link'], rel='alternate')
fg.description(config['feed']['description'])
fg.logo(urljoin(config['feed']['link'], 'favicon.png'))

class Post:
    def __init__(self, id, title, description, content):
        self.id = id
        self.title = title
        self.description = description
        self.content = content

posts = {}
for id, info in config["articles"].items():
    fe = fg.add_entry()
    fe.id(id)
    fe.title(info['title'])
    fe.description(info.get('description'))

    content = open(os.path.join("posts", info['path']), "r", encoding="utf-8").read()
    title = info['title']

    posts[id] = Post(id, info['title'], info.get('description'), content)

@app.template_filter('to_html')
def md_to_html(s):
    return markdowner.convert(s)

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
    return render_template("archives.html", posts=list(posts.values()))


@app.route("/p/<string:name>")
def serve_post(name):
    post = posts.get(name)
    
    if content == None:
        return abort(404)
    
    return render_template_string(post.content)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
