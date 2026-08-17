from flask import Flask, render_template, Response

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/courses")
def courses():
    return render_template("courses.html")


@app.route("/training-experience")
def training_experience():
    return render_template("training_experience.html")


@app.route("/student-feedback")
def student_feedback():
    return render_template("student_feedback.html")


@app.route("/contact", methods=["GET"])
def contact():
    return render_template("contact.html")


@app.route("/sitemap.xml")
def sitemap():
    pages = [
        "https://aruvonlearningsolutions.me/",
        "https://aruvonlearningsolutions.me/about",
        "https://aruvonlearningsolutions.me/courses",
        "https://aruvonlearningsolutions.me/training-experience",
        "https://aruvonlearningsolutions.me/student-feedback",
        "https://aruvonlearningsolutions.me/contact",
    ]

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for page in pages:
        xml += "    <url>\n"
        xml += f"        <loc>{page}</loc>\n"
        xml += "    </url>\n"

    xml += "</urlset>"

    return Response(xml, mimetype="application/xml")


@app.route("/robots.txt")
def robots():
    content = """User-agent: *
Allow: /

Sitemap: https://aruvonlearningsolutions.me/sitemap.xml
"""

    return Response(content, mimetype="text/plain")


@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)
