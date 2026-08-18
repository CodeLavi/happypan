# Happy Pan — GitHub Pages edition

This folder is a static website designed to work directly on GitHub Pages. It does not require Node.js or a build command.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.

GitHub will display the public website URL after deployment finishes.

## Files

- `index.html` — page content
- `styles.css` — visual design and responsive layout
- `app.js` — search, tags, saved recipes, recommendations and waitlist demo
- `.nojekyll` — tells GitHub Pages to serve the files without Jekyll processing

The waitlist is a visual demo and does not send or store email addresses. Connect it to a form service or backend before collecting real signups.
