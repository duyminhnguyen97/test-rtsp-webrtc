const ffmpeg = require('fluent-ffmpeg');

const ffmpegPath = 'F:\\Huggy-electron\\ffmpeg\\bin\\ffmpeg.exe';
const ffprobe = 'F:\\Huggy-electron\\ffmpeg\\bin\\ffprobe.exe';
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobe);

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
    // rtsp://admin:BKPJKM@192.168.0.100
    // WORK HERE
    console.log('OK');

    try {
        const command = ffmpeg()
            .input('rtsp://admin:BKPJKM@192.168.0.100')
            .noAudio()
            .fps(10)
            .format('flv')
            .videoCodec('libx264')
            .on('error', (err, stdout, stderr) => {
                console.error(err.message);
                console.log(stdout);
                console.log(stderr);
            })
            .on('end', () => {
                console.warning(`Camera ended`);
            });

        let streamElement = document.getElementById('stream');
        const mediaSource = new MediaSource();
        streamElement.src = URL.createObjectURL(mediaSource);
        streamElement.play();
        let sourceBuffer = null;
        console.log(streamElement);

        mediaSource.addEventListener('sourceopen', () => {
            console.log('Source open');
            sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001F"');
        });

        const stream = command.pipe();
        stream.on('data', (chunk) => {
            if (mediaSource.readyState === 'open' && sourceBuffer && sourceBuffer.updating === false) {
                console.log(chunk.buffer);
                sourceBuffer.appendBuffer(chunk.buffer);
                console.log(sourceBuffer);
                console.log(mediaSource.duration);
            }
            // let blobArray = [];
            // blobArray.push(new Blob([new Uint8Array(chunk)], { type: 'video/mp4' }));
            // const blob = new Blob(blobArray, { type: 'video/mp4' });
            // console.log(blob);

            // streamElement.src = URL.createObjectURL(blob);
        });
    } catch (error) {
        console.log(error);
    }
};
