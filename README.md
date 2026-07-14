# Kittles Website

## Getting Set Up

### Required
1. Download/install [Node.js](https://nodejs.org/en/download/current). It's easiest just to use the "Windows Installer (.msi)" button
2. Open a command-prompt and run the following command:
   ```
   npm install
   ```

### Optional
1. I prever to use [VS Code](https://code.visualstudio.com/) as my editor. If using VS Code, I'd recommend the following extensions to make your life easier:
   * Nunjucks

## Developing

### Testing locally
You can run/host the website locally to develop/test with, before pushing changes to Neocities with the following command:
```
npm start
```

### Deploying site to Neocities
Start by creating a `.env` file, using the `.env-example` as a template. this file should contain your Neocities username/password. Once done, you can deploy the current site by simply running the following command:
```
npm deploy
```

## Structure of the site contents

### src/
This folder contains the entire site data to-be-built

### src/_data/site.json
This file contains some useful variables that are globally accessible to every page, so if you have some data you'd like to include on every page, you can place it here. This gives you one place to change for every page.

### src/includes/layouts/
This contains the base layouts for pages in the site. Right now, there's only a `base.njk` file. this is your base template that all pages will use. So if you want to change a sidebar component or something, you can change it here.

If you'd like to add additional pages, such as maybe a "post" page or something, where you could make posts/updates to, then you may want to add a new `post.njk` page that can be inherited.

If you do add more than just the `base.njk`, then it may be useful to pull parts of `base.njk` out to shared components that can be included. To include another page, you simply have to do this:

```
{% include "components/header.njk" %}
```

So, making the `base.njk` more generic might be something like this:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} | {{ site.name }}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Water+Brush&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <!-- Full page container -->
  <div class="container">

    <!-- Header -->
    {% include "components/header.njk" %}

    <!-- Container for middle of the page -->
    <div class="boxwrapper">

      <!-- Left Sidebar -->
      <div class="boxes sidebar sidebars">
        {% include "components/navigation.njk" %}
        {% include "components/my-best-friends.njk" %}
        {% include "components/forever-loved.njk" %}
      </div>

      <!-- Middle content -->
      <div class="boxes main">
        {{ content | safe }}
      </div>

      <!-- Right sidebar -->
      <div class="boxes sidebar2 sidebars">
        {% include "components/her-stats.njk" %}
        {% include "components/humans-info.njk" %}
        {% include "components/links.njk" %}
        {% include "components/hitbar.njk" %}
      </div>
    </div>
  </div>
  
  {% include "components/credit.njk" %}
</body>
</html>
```

You could then take that and create a new `post.njk` file which changes which things are included, the styles, etc.

### src/assets/
This includes all asset files (CSS, JS, and images) you want to include in the site. This folder is copied directly into the built website.

### src/posts/
Currently unused, but this includes all posts you want to make. I've created this file and example post because you can actually use this as a sort of blog, where you could have separate posts in here, tagged with the `tags` keyword at the top. You can then include the posts on your page and link to them. This would make it more similar to a blog.

I thought that you might want to do that. When you're thinking of Kittles, you could write a little blog post about here and then republish the site with the updated blog post.

### src/*.njk
These are the main pages in the site. Each one is based off the `base.njk` template, then populates the center contents with the contents from the file itself. The navigation is automatically populated with these items, because they have a `nav: true` at the top

### .eleventy.js
This file includes a few JavaScript codes that are used during building the site, you can generally ignore this file

### .env (and .env-example)
This file generally includes secret details that you don't want to share, but may be needed locally. Specifically, it includes the username/password to upload the files to your site.

You will want to take the `.env-example` file and copy it to a `.env` file, then update the `.env` file. Never commit the `.env` file to a repository. If you need to add more local environments to the `.env` file, add a generic placeholder to the `.env-example` file to keep them in sync.

### package.json (and package-lock.json)
These files are used by Node.js for managing the dependencies required and for additng custom commands. when you run a command like `npm start` or `npm deploy`, it's executing a command defined in this file

### scripts/
This is to include any Node.js scripts to make managing this repository easier. Currently, there's an `upload.js` file for uploading the contents of `_site` to your Neocities site. If you need additional commands to manage the project, we'd likely add the scripts here.

## Improvements

### Blog Posts
If you'd like, we can add a sort of "blog posts" mechanism to this, where you can make posts, where they'd have their own independent pages. It might be good for adding memories and including special things?

### Deploy-on-commit
If you'd like to use Github to manage the website, we can create a Github Actions that will run whenever you commit code to the repository, that will automatically build and deploy the changes to Neocities. So in that case, you'd just edit locally, then push to Github to have it automatically pushed to Neocities.

### Photo Storage
Currently the photo storage is simply done through the Neocities website. However, if space becomes more of an issue, it may be worth looking into alternative storage processes.

### User uploads
This is a bit more difficult to do from Neocities. You'd need an external host/location for people to upload to, then have the Neocities site pull content from there.