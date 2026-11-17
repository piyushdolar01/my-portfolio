# PIYUSH.DEV: Developer Portfolio

A responsive, dark-themed portfolio for **Piyush Dolar**, a Fresher Software Developer and Aspiring Software Engineer.
Built with **only HTML, CSS and Vanilla JavaScript**. No frameworks, no build tools, no backend.

```
my-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── profile.png          <- replace with your photo
    ├── resume.pdf           <- replace with your resume
    ├── favicon.png
    ├── certificates/        <- (create) put internship certificates here
    └── projects/
        ├── skillpath-ai.png
        ├── codepilot.png
        ├── shark-tank.png
        └── vendor-dashboard.png
```

The images and `resume.pdf` that ship in `assets/` are **plain placeholders** so nothing is broken on first run. Replace them (see below).

---

## 1. Run locally

Just double-click `index.html`. No server needed.

(Optional, for testing the contact form: `python3 -m http.server 8000` in this folder, then open http://localhost:8000.)

---

## 2. Things you MUST edit (search for these in `index.html`)

Use your editor's Find (Ctrl+F) for each placeholder:

| Search for | Replace with |
|---|---|
| `YOUR_GITHUB_USERNAME` | your GitHub username (hero, projects, profiles, contact, footer) |
| `YOUR_LINKEDIN_USERNAME` | your LinkedIn handle (the part after `/in/`) |
| `YOUR_LEETCODE_USERNAME` | your LeetCode username |
| `your.email@example.com` | your real email address |
| `YOUR_LIVE_DEMO_URL` | each project's real demo URL (edit each Live Demo link) |
| `YOUR_FORM_ID` | your Formspree form ID (see section 4) |
| `YOUR_USERNAME` | your GitHub username, in the canonical / Open Graph URLs in `<head>` |

Also fill the bracketed placeholders (`[Month Year]`, `[Internship Title]`, `[Company Name]`, `[Add CGPA]`, `[University / College Name]`).

**Safety net:** until you replace a `YOUR_` link, clicking it shows a "still a placeholder" message instead of sending visitors to a broken page. Once you replace it, it works normally.

I did not invent any dates, companies, grades, metrics or statistics. Dates for SkillPath AI and CodePilot are exactly what you supplied.

---

## 3. Replace images and resume

**Profile photo**
1. Use a square photo (about 600x600 px), saved as `profile.png`.
2. Overwrite `assets/profile.png`. Keep the same file name.
   (If the file is missing, the page shows your initials "PD".)

**Resume**
1. Save your resume as `resume.pdf`.
2. Overwrite `assets/resume.pdf`. Both Resume buttons and the navbar button use it, and it downloads as `Piyush-Dolar-Resume.pdf`.

**Project screenshots**
1. Take a screenshot of each project, ideally 16:9 (for example 1280x720).
2. Save as PNG (or JPG) and overwrite the files in `assets/projects/` using the same names.
3. If you use JPG, update the file extension in the matching `<img src="...">` in `index.html`.
4. Keep each image under about 300 KB (compress with squoosh.app) for fast loading.

**Favicon:** overwrite `assets/favicon.png` (64x64 or larger, square).

**Internship certificates**
1. Create the folder `assets/certificates/`.
2. Add `internship-1.pdf`, `internship-2.pdf`, and so on.
3. In `index.html`, change `assets/certificates/YOUR_internship-1.pdf` to the real file name (remove `YOUR_`). Until you do, the button shows a placeholder message instead of a broken link. If you have no certificate for an entry, delete that button.

---

## 4. Configure the contact form (Formspree)

The form will **not** send messages until you do this. Until then, it shows a clear "not configured yet" message.

1. Go to https://formspree.io and create a free account.
2. Click **New Form**, name it (e.g. "Portfolio"), and set the recipient email to yours.
3. Formspree gives you an endpoint like `https://formspree.io/f/xyzabcde`.
4. In `index.html`, find:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   and replace `YOUR_FORM_ID` with your ID (`xyzabcde` in this example).
5. Deploy the site, submit a test message, and confirm Formspree's email-verification step the first time.

Notes: the free plan has a monthly submission limit. The form also has a hidden honeypot field to reduce spam.

---

## 5. Add or edit content

- **Add an internship:** copy a whole `<article class="timeline-item reveal"> ... </article>` block inside the `#experience` section and edit the text. Remove the `placeholder` class from text you have filled in so it appears in normal style.
- **Add a project:** copy one `<article class="project-card reveal"> ... </article>` block. Set `data-category` to any of `fullstack`, `ai`, `data` (space-separated) to make the filter buttons work. Give the feature toggle and panel a new matching `aria-controls` / `id` pair (for example `features-5`).
- **Change colors:** edit the variables at the top of `style.css` under `1. Design tokens`.
- **Change typing words:** edit the `ROLES` array at the top of `script.js`.

---

## 6. Upload to GitHub

**Option A: GitHub website (no Git needed)**
1. Sign in at https://github.com and click **New repository**.
2. Name it `my-portfolio` (or `YOUR_USERNAME.github.io` for a root-domain site). Set it to **Public** and click **Create repository**.
3. Click **uploading an existing file**.
4. Drag in everything **inside** your `my-portfolio` folder (`index.html`, `style.css`, `script.js`, `README.md` and the whole `assets` folder).
5. Click **Commit changes**.

**Option B: Git command line**
```bash
cd my-portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git push -u origin main
```

---

## 7. Deploy for free

**GitHub Pages**
1. In your repository, go to **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch `main`, folder `/ (root)`, then **Save**.
4. After a minute your site is live at `https://YOUR_USERNAME.github.io/my-portfolio/`.
5. Put this URL into the canonical and Open Graph tags in `index.html` (search for `YOUR_USERNAME`).

**Vercel**
1. Sign in at https://vercel.com with your GitHub account.
2. Click **Add New > Project** and import your `my-portfolio` repository.
3. Leave **Framework Preset** as `Other`, with no build command and no output directory.
4. Click **Deploy**. You get a free `*.vercel.app` URL, and every `git push` redeploys automatically.

**Netlify (alternative):** drag the `my-portfolio` folder onto https://app.netlify.com/drop.

---

## 8. Pre-launch checklist

- [ ] All `YOUR_...` placeholders replaced
- [ ] Real email, GitHub, LinkedIn, LeetCode links
- [ ] `profile.png`, `resume.pdf` and project screenshots replaced
- [ ] Formspree ID added and a test message sent
- [ ] Internship, education and project placeholders filled or removed
- [ ] Canonical / Open Graph URL updated after deploying
- [ ] Checked on a phone

---

## Accessibility & features

Semantic HTML5, skip link, keyboard-friendly menu (Escape closes it), visible focus states, ARIA labels, `prefers-reduced-motion` support, sticky blurred navbar, scroll-spy, IntersectionObserver reveal, project filters, expandable feature lists, validated contact form, and back-to-top button.

If JavaScript is disabled, all content is still visible (scroll-reveal hiding only applies when JS runs).

## Honest-content policy

This portfolio contains **no invented metrics, grades, users, rankings or achievements**. The AI/ML section is labelled as foundational knowledge, and the Vendor Performance Dashboard KPI strip on its card is a layout illustration with blank values.
