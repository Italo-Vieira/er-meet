
export default class FakeTrack {
    constructor(id, videoName) {
        this.videoName = videoName;
        this.id = id;
    }

    attach(htmlElement) {
        htmlElement.src = 'http://localhost:3000/' + this.videoName;
        if(this.isVideo()) {
            htmlElement.volume = 0;
            htmlElement.loop = true;
        }
    }

    detach(htmlElement) {
        htmlElement.src = null;
    }

    isVideo() {
        return true;
    }

    isReady() {
        return true;
    }

    getId() {
        return this.id;
    }
}