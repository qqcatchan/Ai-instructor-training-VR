// 主入口文件
import { findAuthoritativeResource } from "./resource-search/find-authoritative-resource.js";
import { generateAlternativeContent } from "./ai-generation/generate-alternative-content.js";
import { compareUserMotion } from "./flash-check/compare-motion.js";
import { compareSpeechAudio } from "./flash-check/compare-speech.js";
import { enableErrorMonitoring } from "./ai-error-recovery/error-monitoring.js";

console.log("AI 虛擬教練訓練系統已初始化");

// 導出所有模組
export {
  findAuthoritativeResource,
  generateAlternativeContent,
  compareUserMotion,
  compareSpeechAudio,
  enableErrorMonitoring
};