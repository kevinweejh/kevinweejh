const fs = require('fs');

const refreshFeaturedArtist = async () => {
  try {
    const featuredArtists = require('./assets/data.json');
    const randomIndex = Math.floor(Math.random() * featuredArtists.length);
    const { 
        artist_image_url, 
        artist_name,
        artist_link,
        artist_about,
        song_title,
        song_youtube_url,
        song_spotify_url,
        song_apple_url,
        x_url,
        instagram_url,
        youtube_url 
    } = featuredArtists[randomIndex];

    const dynamicContent = `
        <p align="center">
            <img src="${encodeURIComponent(artist_image_url)}" alt="${encodeURIComponent(artist_name)} Image" width="200"/>
        </p>
        <h2 align="center">Artist: <a href="${encodeURIComponent(artist_link)}">${encodeURIComponent(artist_name)}</a></h2>
        <h3 align="center">Song: ${encodeURIComponent(song_title)}</h3>
        <hr>
        <details>
        <summary align="center">Tell Me More</summary>
        <br>
        <h3 align="center">Why I Love This Artist</h3>
        <p align="center">
        ${encodeURIComponent(artist_about)}
        </p>
        <h3 align="center">Listen to the Song</h3>
        <p align="center">
            <a href="${encodeURIComponent(song_youtube_url)}">YouTube</a> | 
            <a href="${encodeURIComponent(song_spotify_url)}">Spotify</a> | 
            <a href="${encodeURIComponent(song_apple_url)}">Apple Music</a> 
        </p>
        <h3 align="center">Follow QWER</h3>
        <p align="center">
            <a href="${encodeURIComponent(x_url)}">X</a> | 
            <a href="${encodeURIComponent(instagram_url)}">Instagram</a> | 
            <a href="${encodeURIComponent(youtube_url)}">YouTube</a>
        </p>
        </details>
    `;

    const readmePath = './README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    readmeContent = readmeContent.replace(
      /<td>(.|\n)*<\/td>/,
      dynamicContent
    );

    fs.writeFileSync(readmePath, readmeContent);
  } catch (error) {
    console.error('Error updating featured artist:', error);
  }
}

refreshFeaturedArtist();