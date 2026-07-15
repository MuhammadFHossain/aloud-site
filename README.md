# aloud — website

The marketing + legal site for **aloud**, at **aloudjournal.com**. Plain static HTML/CSS,
no build step, no framework, no tracking. Fonts, screenshots, and stickers come straight
from the app, so it matches the brand exactly.

```
index.html        landing page
privacy.html      Privacy Policy   (Apple requires a Privacy Policy URL)
terms.html        Terms of Use / EULA (needed because the app has a paid unlock)
support.html      Support page     (Apple requires a Support URL)
404.html          not-found page
sitemap.xml, robots.txt
CNAME             the custom domain (used by GitHub Pages; ignored elsewhere)
assets/           styles.css, fonts, icon, app screenshots, stickers
```

## For the App Store submission

In App Store Connect, use these URLs:

- **Privacy Policy URL** → `https://aloudjournal.com/privacy.html`
- **Support URL** → `https://aloudjournal.com/support.html`
- **Marketing URL** (optional) → `https://aloudjournal.com`
- **EULA**: either leave Apple's standard EULA, or paste `https://aloudjournal.com/terms.html`

## Hosting — free, and not Vercel

Everything here is static, so any static host works. Recommended, in order:

### 1. Cloudflare Pages  (recommended — free, easy apex domain, no git needed)
1. Go to **dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets**.
2. Drag in **`aloud-site.zip`** (or this whole folder). No build command, no framework.
3. After it deploys, open **Custom domains → Set up a domain** and add
   `aloudjournal.com` (and `www.aloudjournal.com`). If your domain's DNS is on
   Cloudflare, it wires the records for you automatically. Apex domains work here
   with zero fuss, and bandwidth is unlimited on the free plan.

### 2. GitHub Pages  (also free; nice if you want it in git)
1. Create a new repo, e.g. `aloud-site`, and push these files to `main`.
2. Repo **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Under **Custom domain**, enter `aloudjournal.com` (the `CNAME` file already sets this).
4. At your domain registrar, point the apex `A` records to GitHub's IPs
   (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) and add a `www` CNAME to
   `<your-username>.github.io`. Then tick **Enforce HTTPS**.

### 3. Netlify  (free; drag-and-drop like Cloudflare)
Drag `aloud-site.zip` onto **app.netlify.com/drop**, then add the custom domain in
Site settings → Domain management.

All three give free HTTPS. Cloudflare Pages is the smoothest for an apex domain like
`aloudjournal.com`.

## When the app goes live on the App Store

Open `index.html` and replace the "coming soon on the App Store" `<span class="btn btn-pen" …>`
in the hero with a real link to your App Store page, e.g.:

```html
<a class="btn btn-pen" href="https://apps.apple.com/app/idYOURAPPID">
  <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268c…"/></svg>
  Download on the App Store
</a>
```

(You can also drop in Apple's official "Download on the App Store" badge from
developer.apple.com/app-store/marketing/guidelines.)

## Notes

- Fonts (Fraunces, Newsreader, Kalam) are bundled and licensed under the SIL Open Font
  License, so they are fine to ship on a website.
- Every color is a light/dark pair pulled from the app's `Palette`, so dark mode follows
  the visitor's system automatically.
- Update the contact address in the footer + legal pages if it ever changes; it is
  `contact@farhanhossain.com` everywhere right now.
