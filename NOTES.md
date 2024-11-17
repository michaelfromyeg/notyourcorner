# Writing an app

Going to journal my development steps.

Fresh box of Ubuntu, so first had to install `nvm`. Ran `brew install nvm` and saved the setup commands to my `.bashrc` (by accident) and then my `~/.bashrc` (after a moment of confusion).

Off to [ChatGPT](https://chatgpt.com/share/673909c1-6944-800a-ba39-6cf1e3f9d297). I'm using 4o here.

`create-react-app` is taking ages... wrote a `.editorconfig` because I was bored. (OK... cancelled and re-ran. There's surely no way it is this slow.) (Turns out it's actually that slow.)

```plaintext
Git commit not created Error: Command failed: git commit -m "Initialize project using Create React App"
    at genericNodeError (node:internal/errors:983:15)
    at wrappedFn (node:internal/errors:537:14)
    at checkExecSyncError (node:child_process:888:11)
    at execSync (node:child_process:960:15)
    at tryGitCommit (/home/mdema/code/notyourcorner/notyourcorner/node_modules/react-scripts/scripts/init.js:62:5)
    at module.exports (/home/mdema/code/notyourcorner/notyourcorner/node_modules/react-scripts/scripts/init.js:350:25)
    at [eval]:3:14
    at runScriptInThisContext (node:internal/vm:209:10)
    at node:internal/process/execution:118:14
    at [eval]-wrapper:6:24 {
  status: 128,
  signal: null,
  output: [ null, null, null ],
  pid: 625274,
  stdout: null,
  stderr: null
}
Removing .git directory...
```

Alright. That aside, we're in.

- `npm install react-leaflet leaflet papaparse`
- `npm install --save-dev @types/leaflet`

Let's try running its code and see what happens.

Mostly OK; it outlined a project structure but some of those files went unused. It missed types for `papaparse`. It got some types wrong for `Marker` in Leaflet, and just used `as` casting to fix them. Meh.

I ran it. Looks good so far.

OK... the code for extracting the latitude and longitude was no good. Looks like I may need to call the Google Maps API or similar.

```csv
Fort Mason Center Farmers' Market,,https://www.google.com/maps/place/Fort+Mason+Center+Farmers'+Market/data=!4m2!3m1!1s0x808580d86dc803cd:0x3f06bf33ae71ee7d,
```

The `data=!4m2!3m1!1s0x808580d86dc803cd:0x3f06bf33ae71ee7d` is interesting to me, but perhaps nothing is there. At least we have the name.

ChatGPT was able to come up with a correct `cURL` command to try the API, and it worked.

OK, lots of issues with Maps. Some adventures in "what's in a URL?"

- https://stackoverflow.com/questions/44843934/get-lat-lon-from-google-maps-url-ftid-hex
- https://stackoverflow.com/questions/73669292/how-do-i-get-a-place-id-from-an-ftid-using-google-maps-api
- https://stackoverflow.com/questions/47017387/decoding-the-google-maps-embedded-parameters
- https://stackoverflow.com/questions/72848836/extracting-coordinates-from-a-link-google-map-api
- https://stackoverflow.com/questions/36116174/google-maps-url-expanding-missing-lat-lon
- https://developers.google.com/maps/documentation/places/web-service/details
- https://developers.google.com/maps/documentation/places/web-service/overview#places-api-new
- https://mapsplatform.google.com/pricing/

Figured it out. The CID approach is good.
