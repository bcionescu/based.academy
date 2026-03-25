# The Internet is dying

Algorithms will increasingly feed you a steady diet of AI slop and content that does not serve you. If we want to save the Internet that we know and love, we have to feature promising content creators ourselves.

Based Academy is a directory of interesting people that I follow online. As algorithms and AI slop start to take over, it will become more difficult to find interesting people to watch. This project will seek to address this.

Disclaimer: Including a person on here does not mean that I agree with everything that they say or do, only that I find their content interesting. Use your judgement when following anyone, or listening to what they have to say.

## How it works

Each creator is a Markdown file in `content/creators/` with YAML frontmatter (name, date, social links, categories) and a short bio as the body. Pandoc converts each file into an HTML card fragment using templates, and a Makefile assembles them into the final `index.html` and `feed.atom`.

Creator ordering on the page is controlled by the numeric prefix in the filename (`01-`, `02-`, etc.).

## Project structure

```
content/creators/   Markdown source files (one per creator)
templates/          Pandoc templates and static HTML/XML fragments
Makefile            Build orchestration
.githooks/          Git hooks (pre-commit auto-rebuilds the site)
index.html          Generated output (do not edit directly)
feed.atom           Generated output (do not edit directly)
css/                Stylesheet
assets/             SVG icons
fonts/              Webfonts
pages/              Static subpages (FAQ, privacy policy)
```

## Setup

### Prerequisites

- [pandoc](https://pandoc.org/installing.html) — converts Markdown to HTML/XML
- `make` — build automation
- `git` — version control with hooks support

### Installing prerequisites

#### Arch Linux

```bash
sudo pacman -S --needed base-devel pandoc git
```

`make` is part of the `base-devel` group.

#### macOS (Homebrew)

```bash
brew install pandoc make git
```

### Clone and configure

```bash
git clone https://github.com/bcionescu/based.academy.git
cd based.academy
git config core.hooksPath .githooks
```

The last command activates the pre-commit hook so `index.html` and `feed.atom` are rebuilt automatically whenever you commit changes to creator files or templates.

## Development

Build the site:

```bash
make
```

Clean intermediate files and rebuild:

```bash
make clean && make
```

### Adding a creator

1. Create a new file `content/creators/NN-name.md` (where `NN` is the next number):

```yaml
---
name: "Creator Name"
date_added: "Mon DD YYYY"
date_iso: "YYYY-MM-DDTHH:MM:SSZ"
new: true
socials:
  - label: "YouTube"
    url: "https://youtube.com/@handle"
    icon: "/assets/youtube.svg"
tags:
  - "Technology"
---
Short bio with optional <a href="https://example.com" target="_blank" rel="noopener" class="body-link">inline links</a>.
```

2. Run `make` to preview, or just commit — the pre-commit hook rebuilds automatically.

### Editing a creator

Edit the corresponding `.md` file in `content/creators/` and rebuild with `make` or commit.

### Reordering creators

Rename the numeric prefixes to change the display order, then rebuild.

## Deployment

The site is deployed on [Vercel](https://vercel.com) as static files. Vercel serves `index.html`, `feed.atom`, `css/`, `assets/`, `fonts/`, `pages/`, and `robots.txt` directly. Build tooling (`content/`, `templates/`, `Makefile`, etc.) is excluded via `.vercelignore`.

Since the generated `index.html` and `feed.atom` are committed to git, no build step is needed on Vercel — it simply serves the repo contents.

## License

Code licensed under MIT. Template created by [Speak, Machine](https://github.com/bcionescu/based.academy).
