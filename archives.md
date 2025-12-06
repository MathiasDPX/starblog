---
layout: default
permalink: /archives/
---

# Archives

<ul>
    {% for post in site.articles %}
    <li> <a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>