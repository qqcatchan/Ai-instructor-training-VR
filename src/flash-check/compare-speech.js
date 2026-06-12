// 比較用戶上傳的音頻與標準音頻
function compareSpeechAudio(userAudioFeatures, standardAudioFeatures) {
  const pitchDiff = Math.abs(userAudioFeatures.pitch - standardAudioFeatures.pitch);
  const durationDiff = Math.abs(userAudioFeatures.duration - standardAudioFeatures.duration);
  
  const pitchMatch = Math.max(0, 100 - pitchDiff * 2);
  const durationMatch = Math.max(0, 100 - durationDiff * 10);
  
  const matchPercentage = (pitchMatch + durationMatch) / 2;
  return matchPercentage;
}

// 示例
const userAudio = { pitch: 442, duration: 2 };
const standardAudio = { pitch: 440, duration: 2 };
const audioMatch = compareSpeechAudio(userAudio, standardAudio);
console.log(`語音相似度: ${audioMatch}%`);

export { compareSpeechAudio };