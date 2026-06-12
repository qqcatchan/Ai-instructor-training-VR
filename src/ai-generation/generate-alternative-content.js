// 生成虛擬台詞或動作
function generateAlternativeContent(context) {
  const generatedContent = {};

  if (context.type === "theater") {
    // 生成虛擬台詞內容
    generatedContent.text = `根據經典劇目風格生成: ${
      context.style ? context.style : "莎士比亞風格"
    }`;
    generatedContent.source = "AI Generated - Based on Classic Drama Patterns";
  } else if (context.type === "motion") {
    // 隨機生成動作內容
    generatedContent.motion = [
      { joint: "shoulder", x: 40 + Math.random() * 10, y: 60 + Math.random() * 10 },
      { joint: "elbow", x: 50 + Math.random() * 15, y: 40 + Math.random() * 10 },
      { joint: "knee", x: 85 + Math.random() * 15, y: 75 + Math.random() * 15 }
    ];
    generatedContent.source = "AI Generated - Motion Synthesis";
  } else if (context.type === "speech") {
    // 生成虛擬發音練習
    generatedContent.text = `Generated speech practice: ${context.targetPhrase || "Practice phrase"}`;
    generatedContent.source = "AI Generated - Speech Training";
  } else if (context.type === "music") {
    // 生成虛擬樂曲片段
    generatedContent.melody = [
      { note: "C", duration: 1 },
      { note: "D", duration: 1 },
      { note: "E", duration: 2 }
    ];
    generatedContent.source = "AI Generated - Music Synthesis";
  }

  console.log("生成的內容為:", generatedContent);
  return generatedContent;
}

// 示例: 劇本風格生成
generateAlternativeContent({ type: "theater", style: "莎士比亞風格" });

export { generateAlternativeContent };
