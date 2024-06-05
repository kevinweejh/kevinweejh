// Importing necessary modules from 'fs' and 'path'
import fs from 'fs';
import path from 'path';

// Define an interface for the structure of a featured artist
interface FeaturedArtists {
  artist_image_url: string; 
  artist_name: string;
  artist_link: string;
  artist_about: string;
  song_title: string;
  song_youtube_url: string;
  song_spotify_url: string;
  song_apple_url: string;
  x_url: string;
  instagram_url: string;
  youtube_url: string;
}

// Asynchronous function to refresh the featured artist in the README
const refreshFeaturedArtist = async (): Promise<void> => {
  try {
    // Construct the file path to the JSON data file
    const filePath = path.join(__dirname, 'assets', 'data.json');

    // Read the file content and parse the JSON data
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    const featuredArtists: FeaturedArtists[] = JSON.parse(fileContent);

    const randomIndex: number = Math.floor(Math.random() * featuredArtists.length);
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

    // Construct the dynamic content to be inserted into the README
    const dynamicContent: string = `<td>
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
    <h3 align="center">Follow ${artist_name}</h3>
    <p align="center">
        <a href="${x_url}" target="_blank" rel="noopener noreferrer">X</a> | 
        <a href="${instagram_url}" target="_blank" rel="noopener noreferrer">Instagram</a> | 
        <a href="${youtube_url}" target="_blank" rel="noopener noreferrer">YouTube</a>
    </p>
    </details>
</td>`;

    // Read the current README content
    const readmePath: string = './README.md';
    let readmeContent: string = fs.readFileSync(readmePath, 'utf-8');

    // Replace the old content with the new dynamic content
    readmeContent = readmeContent.replace(
      /<td>(.|\n)*<\/td>/,
      dynamicContent
    );

    // Write the updated content back to the README file
    fs.writeFileSync(readmePath, readmeContent);
  } catch (error) {
    // Log any errors that occur during the update process
    console.error('Error updating featured artist:', error);
  }
}

// Execute the function to refresh the featured artist
refreshFeaturedArtist();