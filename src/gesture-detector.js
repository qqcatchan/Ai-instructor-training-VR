// gesture-detector.js
// MediaPipe-based gesture detector. Uses CDN-loaded MediaPipe Pose and Camera utils.
export class GestureDetector {
    constructor() {
        this.camera = null;
        this.pose = null;
        this.video = null;
        this.canvas = null;
        this.ctx = null;
        this.running = false;
    }

    async init() {
        console.log('🔎 初始化姿勢偵測（MediaPipe）');
        await this._loadScripts();
        this._createVideoAndCanvas();

        // eslint-disable-next-line no-undef
        this.pose = new Pose({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${file}`});
        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.pose.onResults(this._onResults.bind(this));

        // eslint-disable-next-line no-undef
        this.camera = new Camera(this.video, {
            onFrame: async () => {
                await this.pose.send({image: this.video});
            },
            width: 640,
            height: 480
        });
    }

    async _loadScripts() {
        const load = (src) => new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const s = document.createElement('script');
            s.src = src;
            s.onload = () => resolve();
            s.onerror = (e) => reject(e);
            document.head.appendChild(s);
        });

        // Load MediaPipe Pose and utils
        await load('https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/pose.js');
        await load('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
        await load('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js');
    }

    _createVideoAndCanvas() {
        // create hidden video element
        this.video = document.createElement('video');
        this.video.style.display = 'none';
        this.video.width = 640;
        this.video.height = 480;
        this.video.autoplay = true;
        document.body.appendChild(this.video);

        // overlay canvas for debugging
        this.canvas = document.createElement('canvas');
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.canvas.style.position = 'absolute';
        this.canvas.style.right = '20px';
        this.canvas.style.top = '20px';
        this.canvas.style.zIndex = 9999;
        this.canvas.style.border = '2px solid rgba(255,255,255,0.1)';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    start() {
        if (!this.camera) {
            console.warn('GestureDetector 未初始化，請先呼叫 init()');
            return;
        }
        if (this.running) return;
        // request camera permission and start
        this.camera.start();
        this.running = true;
        console.log('▶️ 開始姿勢偵測（MediaPipe）');
    }

    stop() {
        if (!this.running) return;
        if (this.camera) this.camera.stop();
        this.running = false;
        console.log('⛔ 停止姿勢偵測');
    }

    _onResults(results) {
        // draw results on canvas
        this.ctx.save();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(results.image, 0, 0, this.canvas.width, this.canvas.height);

        // eslint-disable-next-line no-undef
        if (results.poseLandmarks) {
            // eslint-disable-next-line no-undef
            drawConnectors(this.ctx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 2});
            // eslint-disable-next-line no-undef
            drawLandmarks(this.ctx, results.poseLandmarks, {color: '#FF0000', lineWidth: 1});

            const output = document.getElementById('gesture-output');
            // simple heuristic: detect raised hands (wrist y less than shoulder y)
            const lm = results.poseLandmarks;
            const leftWrist = lm[15];
            const rightWrist = lm[16];
            const leftShoulder = lm[11];
            const rightShoulder = lm[12];
            let gesture = '無明顯動作';
            let score = 0;

            if (leftWrist && leftShoulder && leftWrist.y < leftShoulder.y - 0.05) {
                gesture = '左手舉起';
                score += 50;
            }
            if (rightWrist && rightShoulder && rightWrist.y < rightShoulder.y - 0.05) {
                gesture = (gesture === '無明顯動作') ? '右手舉起' : gesture + ' & 右手舉起';
                score += 50;
            }

            output.textContent = `Gesture: ${gesture} (score: ${score})`;
        }
        this.ctx.restore();
    }
}
