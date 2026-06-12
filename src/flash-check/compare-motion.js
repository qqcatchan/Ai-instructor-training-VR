// 比較用戶動作與標準動作
function compareUserMotion(userMotion, standardMotion) {
  let score = 0;

  standardMotion.forEach((templateJoint, index) => {
    const userJoint = userMotion[index];
    if (userJoint.joint === templateJoint.joint) {
      const diff =
        Math.sqrt(
          Math.pow(userJoint.x - templateJoint.x, 2) +
            Math.pow(userJoint.y - templateJoint.y, 2)
        ) / 10;
      score += Math.max(0, 100 - diff * 100);
    }
  });

  const finalScore = score / standardMotion.length;
  return finalScore;
}

// 示例
const userMotion = [
  { joint: "elbow", x: 55, y: 35 },
  { joint: "knee", x: 92, y: 78 }
];
const standardMotion = [
  { joint: "elbow", x: 50, y: 30 },
  { joint: "knee", x: 90, y: 80 }
];
const matchScore = compareUserMotion(userMotion, standardMotion);
console.log(`用戶動作匹配度: ${matchScore}%`);

export { compareUserMotion };