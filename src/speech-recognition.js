// ========== 語音識別模組 ==========
class SpeechRecognizer {
    constructor() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('語音識別 API 不支援於此瀏覽器');
            return;
        }
        this.recognition = new SpeechRecognition();
        this.isListening = false;
        this.transcript = '';
        this.init();
    }

    init() {
        console.log('🎤 語音識別模組初始化中...');
        this.recognition.lang = 'zh-HK';
        this.recognition.continuous = false;
        this.recognition.interimResults = true;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateOutput('🎤 聽取中...');
        };

        this.recognition.onresult = (event) => {
            this.transcript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    this.transcript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            this.analyzeOperapLyrics(this.transcript || interimTranscript);
        };

        this.recognition.onerror = (event) => {
            console.error('❌ 語音識別錯誤:', event.error);
            this.updateOutput(`❌ 錯誤: ${event.error}`);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateOutput(`✅ 識別完成: ${this.transcript}`);
        };
    }

    start() {
        if (!this.recognition) return;
        this.transcript = '';
        try {
            this.recognition.start();
        } catch (error) {
            console.error('❌ 無法啟動語音識別:', error);
            this.updateOutput('❌ 無法啟動語音識別');
        }
    }

    stop() {
        if (!this.recognition) return;
        this.recognition.stop();
    }

    analyzeOperapLyrics(text) {
        const operaKeywords = {
            '一二三': { name: '一二三', score: 95 },
            '天地': { name: '天地', score: 90 },
            '帝王': { name: '帝王', score: 88 },
            '衝冠': { name: '衝冠', score: 92 },
            '怒髮': { name: '怒髮', score: 85 }
        };

        let detected = null;
        let score = 0;

        for (const [keyword, data] of Object.entries(operaKeywords)) {
            if (text.includes(keyword)) {
                detected = data.name;
                score = data.score;
                break;
            }
        }

        let feedback = `📝 識別結果: "${text}"\n`;
        if (detected) {
            feedback += `✓ 偵測到京劇唱詞: ${detected}\n`;
            feedback += `📊 識別準確度: ${score}%`;
        } else {
            feedback += `! 未偵測到標準京劇唱詞\n`;
            feedback += `💡 建議: 請使用標準京劇唱詞`;
        }

        this.updateOutput(feedback);
    }

    updateOutput(message) {
        const outputBox = document.getElementById('speech-output');
        if (outputBox) {
            outputBox.textContent = message;
        }
    }

    synthesizeSpeech(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-HK';
        speechSynthesis.speak(utterance);
    }
}

window.speechRecognizer = new SpeechRecognizer();
console.log('✅ speech-recognition.js 已加載');
