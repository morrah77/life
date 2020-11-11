export class StreamService {
    constructor(selector) {
        this.videoDomElement = document.querySelector(selector)
        this.videoDomElement.onloadedmetadata = (e) => {
            this.videoDomElement.play()
        }
    }

    run() {
        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    width: 200,
                    height: 200
                }
            })
            .then (stream => {
                // return {
                //     videoTrack: stream.getVideoTracks()[0],
                //     audioTrack: stream.getAudioTracks[0]
                // }
                this.videoDomElement.srcObject = stream
            })
            .catch(err => {
                console.log(err)
            })
    }
}