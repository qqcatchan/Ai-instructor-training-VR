// gesture-detector.js
// This is a lightweight placeholder for gesture detection. Replace with MediaPipe or similar.
export class GestureDetector {
    constructor() {
        this.timer = null;
        this.count = 0;
    }

    async init() {
        console.log('🔎 初始化姿勢偵測（Placeholder）');
        // In real app, load MediaPipe / TF model here
        return Promise.resolve();
    }

    start() {
        console.log('▶️ 開始姿勢偵測（模擬）');
        const output = document.getElementById('gesture-output');
        this.timer = setInterval(() => {
            this.count++;
            output.textContent = `偵測到動作次數: ${this.count}`;
        }, 1000);
    }

    stop() {
        console.log('⛔ 停止姿勢偵測');
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }
}
