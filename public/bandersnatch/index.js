const MANIFEST_URL = "manifest.json";
const localHost = ["127.0.0.1", "localhost"];

async function main() {
  const isLocal = !!~localHost.indexOf(window.location.hostname);
  console.log("isLocal?", isLocal);
  const manifestJSON = await (await fetch(MANIFEST_URL)).json();
  const host = isLocal ? manifestJSON.localhost : manifestJSON.productionHost;
  const videoComponent = new VideoComponent();
  console.log({ host });
  console.log(manifestJSON.localhost);
  console.log(manifestJSON.fileResolutionTag);
  const network = new Network({ host });

  const videoPlayer = new VideoMediaPlayer({
    manifestJSON,
    network,
  });

  videoPlayer.initializeCodec();
  videoComponent.initializePlayer();
}

window.onload = main;
