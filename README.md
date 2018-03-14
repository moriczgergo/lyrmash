# lyrmash
A twitter bot that mashes lyrics and tweets them.

The goal here was to make something more lightweight than twitter-ebooks, and I think we got it!

## Setup

## Docker (recommended)

 1. Clone this repo. (`git clone https://github.com/moriczgergo/lyrmash`)
 2. Install packages. (`npm i`)
 3. [Set up your Genius app.](#genius-setup)
 4. [Set up your Twitter app.](#twitter-setup)
 5. [Set up your envfile.](#envfile-setup)
 6. [Build your image.](#image-setup)

### Genius Setup

 1. (Create a Genius account if you haven't.)
 2. [Create a new API Client.](https://genius.com/api-clients/new) (leave Redirect URI blank)
 3. Click on `Genereate Access Token`, and take note of it. (You won't need the Client ID & Secret.)

### Twitter Setup

 1. (Create a Twitter account for your bot if you haven't.)
 2. [Create a new Twitter App.](https://apps.twitter.com/app/new) (leave Callback URL blank)
 3. Click on `Keys and Access Tokens`.
 4. Take note of the Consumer Key and Secret.
 5. On the bottom of the page, click `Create my access token`.
 6. Take note of the Access Token and Secret.

### Envfile Setup

Lyrmash uses a `.env` file to import environment variables into the app. You should create a .env file, and fill it like this:

```
LYRMASH_KEY=<TWITTER CONSUMER KEY>
LYRMASH_SECRET=<TWITTER CONSUMER SECRET>
LYRMASH_TOKEN=<TWITTER ACCESS TOKEN KEY>
LYRMASH_TOKEN_SECRET=<TWITTER ACCESS TOKEN SECRET>
```

*Note: your .env file won't be included in your Docker image.*

### Image Setup

To build your image, you'll have to run the following command:

```
docker build --build-arg "LYRMASH_GENIUS=<YOUR GENIUS ACCESS TOKEN>" --build-arg "LYRMASH_AID=<GENIUS ARTIST ID TO GET SONGS FROM>" -t <YOUR NAME>/<YOUR IMAGE NAME> .
```

**WARNING: This will possibly leak your Genius access token via `docker history`. We don't have a solution for this yet.**

After the build runs, the container will fail and won't start automatically, but we'll solve that.

```
docker run --env-file .env -d <YOUR NAME>/<YOUR IMAGE NAME>
```

When we specify the environment file, it works!

## Manual

 1. Clone this repo. (`git clone https://github.com/moriczgergo/lyrmash`)
 2. Install packages. (`npm i`)
 3. [Set up your Genius app.](#genius-setup)
 4. [Set up your Twitter app.](#twitter-setup)
 5. [Set up your envfile.](#envfile-setup)
 6. [Scrape the lyrics.](#lyric-scraping)
 7. Run with `npm start`!

### Lyric Scraping

You need to scrape lyrics via Genius, to create mashed up versions.

```
npm run scrape -- "<YOUR GENIUS ACCESS TOKEN>" "<GENIUS ARTIST ID>"
```

This will look up all the songs from the specified artist, and dump the lyricis into `dump.txt` for the bot to use.

## Custom Lyric Data

You want to mash up custom lyrics, or not even lyrics? You're crazy. Anyways, you'll need to modify `dump.txt` in the app directory. Every sentence needs to end with a dot, question mark, or exclamation mark. Seperate sentences with **spaces**, not *newlines*.

Have fun!