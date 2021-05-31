const ffmpeg = require('fluent-ffmpeg');
const wrtc = require('wrtc');
const w2f = require('wrtc-to-ffmpeg')(wrtc);

const ffmpegPath = 'F:\\Huggy-electron\\ffmpeg\\bin\\ffmpeg.exe';
ffmpeg.setFfmpegPath(ffmpegPath);

let cameraUrl = '';

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#record-camera').addEventListener('click', recordCamera);
    document.querySelector('#rtsp-submit').addEventListener('submit', addRTSPUrl);
});

const addRTSPUrl = async (event) => {
    event.preventDefault();
    cameraUrl = document.getElementById('rtsp').value;
    console.log(cameraUrl);
};

const recordCamera = async () => {
    // WORK HERE
    console.log('OK');

    try {
        const videoOutput = await w2f.output({ kind: 'video', width: 480, height: 360 });
        const audioOutput = await w2f.output({ kind: 'audio', sampleRate: 48000 });

        console.log(videoOutput);
        console.log(videoOutput.track);

        const stream = document.querySelector('#stream');

        // ffmpeg('rtsp://admin:BKPJKM@192.168.0.107')
        //     .output(videoOutput.url)
        //     .outputOptions(videoOutput.options)
        //     .output(audioOutput.url)
        //     .outputOptions(audioOutput.options);

        // const video = new MediaStream();
        // console.log(videoOutput.track);
        // video.addTrack(videoOutput.track);

        // console.log(video.captureStream());
    } catch (error) {
        console.log(error);
    }
};
