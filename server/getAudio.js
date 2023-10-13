const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const videoUrl = "https://www.youtube.com/watch?v=oL1uem6-3m4";

async function getAudio() {
  const videoStream = ytdl(videoUrl, {
    quality: "highestaudio",
    filter: "audioonly",
  });
  return new Promise((resolve, reject) => {
    ffmpeg(videoStream)
      .toFormat("mp3")
      .saveToFile("audio.mp3", (stdout, stderr) => {})
      .on("end", () => {
        console.log("Finished converting video to MP3!");
        resolve();
      })
      .on("progress", (progress) => {
        console.log(progress.timemark);
      })
      .on("error", (err) => {
        console.error(err);
      })
      .run();
  });
}
getAudio();
module.exports = getAudio;
