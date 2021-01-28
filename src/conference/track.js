export default class Track {
    constructor(mediaStream) {
        this.mediaStream = mediaStream;
    }

    attach(htmlElement) {
        htmlElement.srcObject = this.mediaStream
        htmlElement.onloadedmetadata = (e) => {
            htmlElement.play();
        };
        if(this.isVideo()) {
            htmlElement.volume = 0;
        }
    }

    detach(htmlElement) {
        htmlElement.srcObj = undefined;
        // this.mediaStream should close
    }

    isVideo() {
        return this.mediaStream.getTracks()[0].kind == "videoinput"
    }

    isReady() {
        return true;
    }

    getId() {
        return this.mediaStream.deviceId;
    }
}