<<<<<<< HEAD
# Aruvon
Our company website
=======
# Aruvon Learning Solutions — Website (Flask)

A minimal Flask app serving the Aruvon marketing site — Home, About, Courses,
Training Experience, Student Feedback, and Contact. No database, no login,
no backend logic — just routes rendering templates. Built specifically to
deploy as a Render free web service.

## Run locally

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate.bat
pip install -r requirements.txt
python app.py
```

Open **http://localhost:5000**.

## Project structure

```
app.py                  All routes — one per page, no logic beyond render_template
requirements.txt        Flask + gunicorn
Procfile                 Tells Render how to run it: gunicorn app:app
runtime.txt               Pins the Python version Render uses

templates/
  base.html               Shared <head>, nav, footer
  partials/nav.html         Nav bar (uses url_for, so links never break)
  partials/footer.html       Footer
  home.html, about.html, courses.html, training_experience.html,
  student_feedback.html, contact.html
  404.html                  Branded not-found page

static/
  css/styles.css           All site styling
  js/main.js                 Scroll reveals, mobile nav, hero animation, domain tab filter
  img/logo-icon.png, logo-full.png
  img/trainers/trainer-1.jpg ... trainer-6.jpg   <- placeholder photos, see below
  img/feedback/thumb-1.jpg ... thumb-6.jpg         <- placeholder thumbnails
```

## Deploying to Render

1. Push this folder to a GitHub repo.
2. On Render: **New +** → **Web Service** → connect the repo.
3. Render should auto-detect Python and the `Procfile`. If it asks:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
4. Deploy. Render gives you a `*.onrender.com` URL immediately — point your
   `aruvonlearningsolutions.me` domain at it later from Render's Custom
   Domain settings whenever you're ready.

No environment variables are required — there's nothing to configure.

## Replacing placeholders later

- **Trainer photos**: replace the files in `static/img/trainers/` — keep the
  same filenames (`trainer-1.jpg` through `trainer-6.jpg`) and the site
  updates with no code changes. Trainer names/roles/bios are hardcoded in
  `templates/training_experience.html` — search for "Trainer Name" and edit
  directly.
- **Student feedback Google Drive link**: open `templates/student_feedback.html`
  and find `REPLACE_WITH_YOUR_FOLDER_ID` — replace with your real public
  Google Drive folder URL (appears twice: the main CTA button and every video
  card link to the same folder).
- **Course price**: currently a flat Rs. 7,999 across all 18 courses, set in
  `templates/courses.html` (search for `course-price`). Change it there if
  you want per-duration pricing instead.

## What's intentionally not here

No database, no user accounts, no forms that submit anywhere (the contact
page is phone/Instagram/LinkedIn click-throughs, not a form) — this is a
pure marketing site by design. If you want a real inquiry form that emails
you, or a portal for students later, that's a separate, larger build — say
the word when you're ready for it.
>>>>>>> 626110a (initial commit)
