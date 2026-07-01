import { initStage, startStage } from './chinese-opera.js';
import { MusicEngine } from './music-engine.js';
import './speech-recognition.js';
import { GestureDetector } from './gesture-detector.js';

let musicEngine;
let gestureDetector;
let stageInitialized = false;

window.addEventListener('DOMContentLoaded', () => {
    // Buttons
    document.getElementById('start-vr').addEventListener('click', async () => {
        if (!stageInitialized) {
            await initStage(document.querySelector('.stage'));
            stageInitialized = true;
        }
        startStage();
    });

    document.getElementById('play-music').addEventListener('click', () => {
        if (!musicEngine) musicEngine = new MusicEngine();
        musicEngine.togglePlay();
    });

    document.getElementById('start-speech').addEventListener('click', () => {
        if (window.speechRecognizer) window.speechRecognizer.start();
    });

    document.getElementById('stop-speech').addEventListener('click', () => {
        if (window.speechRecognizer) window.speechRecognizer.stop();
    });

    document.getElementById('start-gesture').addEventListener('click', async () => {
        if (!gestureDetector) {
            gestureDetector = new GestureDetector();
            await gestureDetector.init();
        }
        gestureDetector.start();
    });

    document.getElementById('stop-gesture').addEventListener('click', () => {
        if (gestureDetector) gestureDetector.stop();
    });
});
