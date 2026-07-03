# Movindu Thenura — Portfolio

A single-page portfolio site. Dark, cinematic, motion-driven.

## Structure

```
movindu-portfolio/
├── index.html              # markup
├── css/
│   └── style.css           # all styles (design tokens at the top)
├── js/
│   └── main.js              # preloader, scroll reveals, nav, video, gauges
└── assets/
    ├── images/
    │   ├── profile.jpg          # About section photo
    │   └── award-ceremony.jpg   # video poster (Honours Night)
    └── video/
        └── innovation-award.mp4 # Innovation Award feature (compressed for web)
```

## Running it locally

No build step — it's plain HTML/CSS/JS. Just serve the folder, e.g.:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`. (Opening `index.html` directly by double-clicking also
works in most browsers, though some browsers block local video loading via `file://` — a
local server avoids that.)

## Deploying

Push this whole folder to a static host — GitHub Pages, Netlify, or Vercel all work with
zero configuration since there's no build step. Just make sure the `assets/` folder is
included in the deploy (some hosts ignore folders not referenced at build time — not an
issue here since it's referenced directly in `index.html`).

## Notes

- `assets/video/innovation-award.mp4` was compressed from the original 67MB file down to
  ~4.7MB (1280×720, H.264) so it loads reasonably fast on the web. If you'd rather host the
  video on YouTube/Vimeo instead of serving the file directly, swap the `<video>` block in
  the Featured Project section of `index.html` for an `<iframe>` embed.
- Content (experience, projects, skills, dates) lives directly in `index.html` — there's no
  CMS or data file, so edits are just text edits in the markup.
- Colors, fonts, and spacing are all CSS custom properties at the top of `style.css` under
  `:root` — change them there to re-theme the whole site.
