// music-engine.js
export class MusicEngine {
    constructor() {
        // Use a media file from Chinese-s-opera- repo (may be mp4 with audio). If you have a proper mp3, replace the URL.
        this.audio = new Audio('https://raw.githubusercontent.com/qqcatchan/Chinese-s-opera-/main/gemini_generated_video_55B076B0.mp4');
        this.isPlaying = false;
        this.audio.crossOrigin = 'anonymous';
        this.audio.loop = true;
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
