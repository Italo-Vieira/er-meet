export default class Track {
    constructor(mediaStream) {
        this.mediaStream = mediaStream;
    }

    attach(htmlElement) {
        console.log("atachando")
        htmlElement.srcObject = this.mediaStream
        htmlElement.onloadedmetadata = (e) => {
            console.log("playando   1")

            htmlElement.play();
        };
        if(this.isVideo()) {
            htmlElement.volume = 0;
            console.log("playando")
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