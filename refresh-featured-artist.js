const fs = require('fs');
const path = require('path');

const refreshFeaturedArtist = async () => {
  try {
    const filePath = path.join(__dirname, 'assets', 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const featuredArtists = JSON.parse(fileContent);

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

    const dynamicContent = `<td>
    <p align="center">
        <img src="${artist_image_url}" alt="${artist_name} Image" width="200"/>
    </p>
    <h2 align="center">Artist: <a href="${artist_link}" target="_blank" rel="noopener noreferrer">${artist_name}</a></h2>
    <h3 align="center">Song: ${song_title}</h3>
    <hr>
    <details>
    <summary align="center">Tell Me More</summary>
    <br>
    <h3 align="center">Why I Love This Artist</h3>
    <p align="center">
    ${artist_about}
    </p>
    <h3 align="center">Listen to the Song</h3>
    <p align="center">
        <a href="${song_youtube_url}" target="_blank" rel="noopener noreferrer">YouTube</a> | 
        <a href="${song_spotify_url}" target="_blank" rel="noopener noreferrer">Spotify</a> | 
        <a href="${song_apple_url}" target="_blank" rel="noopener noreferrer">Apple Music</a> 
    </p>
    <h3 align="center">Follow QWER</h3>
    <p align="center">
        <a href="${x_url}" target="_blank" rel="noopener noreferrer">X</a> | 
        <a href="${instagram_url}" target="_blank" rel="noopener noreferrer">Instagram</a> | 
        <a href="${youtube_url}" target="_blank" rel="noopener noreferrer">YouTube</a>
    </p>
    </details>
</td>`;

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