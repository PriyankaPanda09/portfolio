# Priyanka Panda — Portfolio Website
## Deployment Guide (Zero to Live in 10 Minutes)

---

## 📁 Files in this project
```
portfolio/
├── index.html    ← Main HTML page (all content here)
├── style.css     ← All styling (dark cyberpunk theme)
└── script.js     ← Boot screen, animations, XP system
```

---

## 🚀 Deploy to Vercel (Recommended — Free)

### Step 1: Push to GitHub
1. Go to https://github.com → New Repository → Name it `portfolio`
2. On your computer, open terminal in the `portfolio/` folder:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `portfolio` repository
4. Click **Deploy** — that's it!
5. Your live URL: `https://priyanka-panda.vercel.app` (or similar)

---

## 🌐 Custom Domain (Optional but looks pro)
- Buy `priyankpanda.dev` or `priyanka.codes` from Namecheap (~₹800/yr)
- In Vercel → Settings → Domains → Add your domain
- Follow the DNS instructions (5 minutes)

---

## ✉️ Make the Contact Form Actually Send Emails

### Option A: Formspree (Easiest)
1. Go to https://formspree.io → Sign up free
2. Create a form → Get your form ID
3. In `index.html`, replace the `<form>` tag:
   ```html
   <form class="contact-form card-glass" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Remove the `id="contact-form"` and the JS form handler from script.js
5. Done! Emails land in your inbox.

### Option B: EmailJS (No backend needed)
1. Go to https://emailjs.com → Free plan (200 emails/month)
2. Connect your Gmail
3. In script.js, replace the setTimeout fake send with:
   ```js
   emailjs.send("service_id", "template_id", {
     from_name: form.querySelector('input[type=text]').value,
     reply_to: form.querySelector('input[type=email]').value,
     message: form.querySelector('textarea').value
   });
   ```

---

## 🎨 Customizing Your Portfolio

### Add a real project:
Replace the locked card in `index.html` with:
```html
<div class="project-card card-glass">
  <div class="project-difficulty medium">◈ MEDIUM</div>
  <div class="project-badge-ai">FULLSTACK</div>
  <h3 class="project-title">Your Project Name</h3>
  <p class="project-desc">Brief description here...</p>
  <div class="project-stack">
    <span>React</span><span>Node.js</span>
  </div>
  <div class="project-actions">
    <a href="YOUR_GITHUB_LINK" class="btn-sm">⚙ GitHub</a>
    <a href="YOUR_LIVE_LINK" class="btn-sm btn-sm--alt">▶ Demo</a>
  </div>
</div>
```

### Update GitHub/LinkedIn links:
Search for `https://github.com` and `https://linkedin.com` in index.html 
and replace with your actual profile URLs.

---

## 📱 Mobile Support
The site is responsive. On screens < 900px:
- HUD nav collapses (add a hamburger menu if needed)
- Avatar hides
- Grid becomes single column

---

## ⚡ Performance Tips
- Run Lighthouse in Chrome DevTools → aim for 90+ score
- Add this to `<head>` for faster font loading:
  ```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```
- Compress any images with https://squoosh.app before adding them

---

## 🔍 SEO (So recruiters find you)
Add inside `<head>` in index.html:
```html
<meta name="description" content="Priyanka Panda — Full Stack Developer & AI/ML Engineer from Odisha. React.js, Node.js, TensorFlow, AWS." />
<meta property="og:title" content="Priyanka Panda — Portfolio" />
<meta property="og:description" content="Full Stack Developer & AI/ML Engineer" />
```

---

Built with pure HTML/CSS/JS — no frameworks, no build tools needed.
