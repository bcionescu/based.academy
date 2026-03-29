import {parse, stringify} from 'smol-toml'
import process from 'node:process'
import fs from 'node:fs'
import {ACTIONS, parseCommand} from './actions.js'
import readline from 'readline-sync';

const cmdIns = parseCommand(process.argv)

if(cmdIns === ACTIONS.ADD){
  try { 
  const configToml = fs.readFileSync('./config.toml', 'utf-8');
  let parsedProperties = parse(configToml);
  console.log(parsedProperties);
  
  console.log("Enter the name of the based human: ");
  let name = readline.question()
  console.log(name)
  
  parsedProperties[name] = {"name":name}
  let serializedToml = stringify(parsedProperties); 

  console.log(serializedToml)
  fs.writeFileSync('./config.toml', serializedToml);
  console.log("The based person is added to the toml file");

  } catch (err) {
    if(err.errno === -2){
      console.log('creating the file config.toml');
      fs.writeFileSync('./config.toml','');
      const configToml = fs.readFileSync('./config.toml', 'utf-8');
      let parsedProperties = parse(configToml);
      console.log(parsedProperties);
  
      console.log("Enter the name of the based human: ");
      let name = readline.question()
      console.log(name)

      parsedProperties[name] = {"name":name}
      let serializedToml = stringify(parsedProperties); 

      console.log(serializedToml)
      fs.writeFileSync('./config.toml', serializedToml);
      console.log("The based person is added to the toml file");
    }else{
      console.log(err);
    } 
  }
}else if(cmdIns === ACTIONS.BUILD){
 const initialTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Temporary password: yourmom -->
  <!-- Boy, it sure would be awkward if I forgot to delete this ;) -->

  <link rel="preload" href="/fonts/iAWriterMonoS-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/iAWriterMonoS-Bold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/iAWriterMonoS-Italic.woff2" as="font" type="font/woff2" crossorigin>

	<title>Based Academy</title>
  <meta name="description" content="An independent directory of like-minded content creators.">
	<link rel="stylesheet" href="/css/styles.css">
	<link rel="alternate" type="application/atom+xml" title="Directory Feed" href="/feed.atom">
</head>

<body>

  <header>
    <div class="top-links-container">
      <a class="top-left-link" href="/" rel="noopener noreferrer">Home</a>
      <a class="top-left-link" href="/pages/FAQ" rel="noopener noreferrer">FAQ</a>
      <a class="top-center-link" href="/" rel="noopener noreferrer">Based Academy</a>
    </div>
  </header>

  <main>

    <div id="header" style="min-height: 3rem;"></div>

    <div class="container">
        <p>The Internet is dying.</p>
        <p>Algorithms feed you a steadily increasing diet of AI slop, and content that does not serve you. It does not have to be this way.</p>
        <p>Welcome to the Based Academy, a place where you can learn from technically-minded content creators who value knowledge and independence.</p>
        <!-- <br> -->
        <p><img src="/assets/location-dot.svg" width="24" height="24" alt="Location Dot" class="icon" align="top"> The alive internet starts here.</p>
        <br>`
    const tomlFile = fs.readFileSync('./config.toml', 'utf-8');
    const parsedProperties = parse(tomlFile);
  const entries = Object.entries(parsedProperties);
    let createdHtml = '';
  console.log(parsedProperties)
  for(let [name, _ ] of entries){ 
    let noDiv = false;
    if(entries[0][1] !== name){
      createdHtml += `<div style="height: 0.1em;"></div>`;
    }
    createdHtml += `\n
<span class="bordered-paragraph">
    <h3>${name}</h3>
    <h3> [  
        <a href="" target="_blank" rel="noopener"><img src="/assets/youtube.svg" width="24" height="24" alt="YouTube" class="icon"></a>  
        <a href="" target="_blank" rel="noopener"><img src="/assets/bookmark.svg" width="24" height="24" alt="Substack" class="icon"></a>
        <a href="" target="_blank" rel="noopener"><img src="/assets/odysee.svg" width="24" height="24" alt="Odysee" class="icon"></a>  
        <a href="" target="_blank" rel="noopener"><img src="/assets/globe.svg" width="24" height="24" alt="Website" class="icon"></a>
        <a href="" target="_blank" rel="noopener"><img src="/assets/twitch.svg" width="24" height="24" alt="Twitch" class="icon"></a>  
        <a href="" target="_blank" rel="noopener"><img src="/assets/github.svg" width="24" height="24" alt="GitHub" class="icon"></a>  
        <a href="" target="_blank" rel="noopener"><img src="/assets/x-twitter.svg" width="24" height="24" alt="Twitter" class="icon"></a>
        <a href="" target="_blank" rel="noopener"><img src="/assets/tiktok.svg" width="24" height="24" alt="TikTok" class="icon"></a>    
        <a href="" target="_blank" rel="noopener"><img src="/assets/instagram.svg" width="24" height="24" alt="Instagram" class="icon"></a>    
        <a href="" target="_blank" rel="noopener"><img src="/assets/bluesky.svg" width="24" height="24" alt="Bluesky" class="icon"></a>  
        <a href="" target="_blank" rel="noopener"><img src="/assets/mastodon.svg" width="24" height="24" alt="Mastodon" class="icon"></a>  
        <a href="" target="_blank" rel="noopener"><img src="/assets/bandcamp.svg" width="24" height="24" alt="Bandcamp" class="icon"></a>
        <a href="" target="_blank" rel="noopener"><img src="/assets/patreon.svg" width="24" height="24" alt="Patreon" class="icon"></a>
        <a href="" target="_blank" rel="noopener"><img src="/assets/spotify.svg" width="24" height="24" alt="Spotify" class="icon"></a>   
        <a href="" target="_blank" rel="noopener"><img src="/assets/podcast.svg" width="24" height="24" alt="Apple Podcast" class="icon"></a>
    ]</h3>
    <p>Description</p>
    <div class="label-container">
        <span class="custom-label">Added ${new Date().toLocaleString('en-US',{month:'short', day:'numeric', year:'numeric'})}</span>
        <span class="custom-label">Programming</span>
    </div>
    <p></p>
</span>`
  }
  let endingTemplate = `
        <br> 
      </div>
    </main>

	<footer id="footer">

    <p class="center">
        <a href="/feed.atom" class="body-link">RSS</a>
        - 
        <a href="/pages/privacy-policy" class="body-link">Privacy Policy</a>

        <br><br>

        Template created by <a href="https://github.com/bcionescu/based.academy" target="_blank" rel="noopener" class="body-link"><img src="/assets/github.svg" width="24" height="24" alt="GitHub" class="icon" align="top"> Speak, Machine.</a> Code licensed under MIT.
    </p>

  </footer>

</body>

</html>`
  const finalTemplate = initialTemplate + createdHtml + endingTemplate;
  fs.writeFileSync('./../index.html', finalTemplate);
}
