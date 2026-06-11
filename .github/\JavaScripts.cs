// 优化前
for (let i = 0; i < arr.length; i++) { ... }

// 优化后
const len = arr.length;
for (let i = 0; i < len; i++) { ... }