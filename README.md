# Kittles Website

## Getting Set Up

### Required
1. Download/install [Node.js](https://nodejs.org/en/download/current). It's easiest just to use the "Windows Installer (.msi)" button
2. Clone (or download) this repository
3. Open a command-prompt inside of this repository
   * If you're using VS Code, you can do that by simply going to View -> Terminal
4. Run the following command from the project root:
   ```bash
   npm install
   ```
   If you get an error "UnauthorizedAccess", you may need to enable script execution.
   1. Open PowerShell as Administrator. (Click your Windows Start menu, type PowerShell, right-click it, and select Run as administrator.)
   2. Change the Execution Policy
      ```powershell
      Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
      ```
   3. Confirm the Change. Press 'Y'
   4. Restart the terminal

### Optional
1. I prever to use [VS Code](https://code.visualstudio.com/) as my editor. If using VS Code, I'd recommend the following extensions to make your life easier:
   * Nunjucks

## Developing

### Testing locally
You can run/host the website locally to develop/test with, before pushing changes to Neocities with the following command:
```bash
npm start
```

### Deploying site to Neocities
Start by creating a `.env` file, using the `.env-example` as a template. this file should contain your Neocities username/password. Once done, you can deploy the current site by simply running the following command:
```bash
npm run deploy
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

```njk
{% include "components/header.njk" %}
```

So, making the `base.njk` more generic might be something like this:
```njk
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

Your CSS file is located here at `src/assets/css/style.css`.

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

## Simple Git Overview

### Setting up git for VS Code
To get git to work with VS Code, we'll need to update your SSH key for git
to properly find/use it. To do this, open the `PuTTYgen` program and click
"Load". Then select your "id_rsa.ppk" file, it should be located at "C:\Users\JD\.ssh".

Next, select Conversions -> Export OpenSSH key, save the file as "id_rsa" in
the same directory as above (C:\Users\JD\.ssh)

Finaly, create a new file named "config" in the same directory (C:\Users\JD\.ssh) with these contents:
```
Host github.com
    User git
    Hostname github.com
    IdentityFile ~/.ssh/id_rsa
```

VS Code should now be able to use your SSH key and thus properly authenticate to github.

### Saving your changes to git
Here are some simple instructions for using VS Code Git and Github to save your changes.

#### 1. Stage your changes
In VS Code, you can do this with the little "+" icon, this tells Git that you want this change to be part of your next commit

#### 2. Commit your changes
In VS Code, this is the "Commit" button, this will take all changes that have been staged and save them to your local git repository. At this point, all the changes are local and isolated to just your computer.

#### 3. Push your changes to Github
In VS Code, this is in the lower panel and has a little upward pointing arrow. This will take all commits you've made locally and push them to Github, saving them outside of your computer.

There's also a shortcut of steps 2 and 3, where you can "Commit & Push" at once, which will take your commit and push it to the remote Github repository at the same time.

There's also a "Sync Changes" button that appears when changes are ready to be synced (pushed or pulled) that you can use.

### Fetching remote changes
If there have been changes to your github repository outside of what you've worked on (such as if I've made changes for you), you can pull them locally. In VS Code, this is the downward arrow in the bottom panel that says "Pull" when you hover over it.

Pulling takes all of the remote respository changes and saves them locally to your system, updating your local files to match the remote files.

There's also a "Sync Changes" button that appears when changes are ready to be synced (pushed or pulled) that you can use.