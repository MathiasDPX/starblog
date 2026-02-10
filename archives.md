---
layout: default
permalink: /archives/
---

# Archives

{% assign sorted_articles = site.articles | sort: "date" | reverse %}

<ul>

  {%- comment -%} WITH date {%- endcomment -%}
  {% for post in sorted_articles %}
    {% if post.date %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}

  {%- comment -%} WITHOUT date {%- endcomment -%}
  {% for post in site.articles %}
    {% unless post.date %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endunless %}
  {% endfor %}

</ul>
