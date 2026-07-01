// music-engine.js
export class MusicEngine {
    constructor() {
        this.audio = new Audio('/assets/audio/opera_sample.mp3');
        this.isPlaying = false;
        this.audio.crossOrigin = 'anonymous';
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            console.log('⏸️ 音樂暫停');
        } else {
            this.audio.play().catch(err => console.error('播放錯誤', err));
            this.isPlaying = true;
            console.log('▶️ 音樂播放');
        }
    }
}
