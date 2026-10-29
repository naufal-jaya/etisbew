# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## LinkedIn post cards

In Sanity Studio, create a **LinkedIn Posts** document:

1. Paste the full HTTPS LinkedIn post URL (`/posts/...` or `/feed/update/...`).
2. Enter **Title**, set **Published Date**, upload the **Cover** image (optional image description), and optionally add an **Excerpt**.
3. Publish the document and rebuild/redeploy the Astro website.

Activities is assigned automatically using its existing CMS color. Cards include the category label, cover, title, date, divider, and excerpt, matching regular post cards without an author byline. On mobile, compact cards hide the excerpt like other post cards. LinkedIn cards retain the hover/tap link controls.

LinkedIn cards use the existing layouts and open the original LinkedIn post. They do not create local article pages. Activities posts (including LinkedIn posts) are excluded from featured, recent, and related-post recommendations; they remain available in the main posts listing and Activities filter. Existing articles keep their local links.

This is manual entry: no LinkedIn API, scraping, background job, or automatic text/image import is involved. Deploy the updated Sanity Studio to expose the new document type in a hosted Studio (`npm run studio:deploy`). The website remains statically generated, so Sanity publication alone does not update deployed pages.

Verify the integration without remote CMS requests:

```sh
node --experimental-strip-types scripts/test-linkedin-posts.mjs
```

Dummy posts are shown only when Sanity is unconfigured or the posts request fails. Successful responses, including empty responses and short featured/recent lists, are never padded with dummy posts.
