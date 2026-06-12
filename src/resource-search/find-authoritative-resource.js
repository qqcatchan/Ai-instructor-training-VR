// 搜索權威資源
async function findAuthoritativeResource(query) {
  const response = await fetch("src/authoritative-resources.json");
  const resources = await response.json();

  // 根據關鍵字匹配資源
  const matches = resources.resources.filter((resource) => {
    return resource.type === query.type && resource.name.includes(query.keyword);
  });

  if (matches.length > 0) {
    console.log("找到權威資源:", matches);
    return matches[0]; // 返回第一個匹配項
  } else {
    console.log("未能找到權威資源");
    return null;
  }
}

// 示例：尋找莎士比亞《哈姆雷特》片段
findAuthoritativeResource({ type: "theater", keyword: "哈姆雷特" }).then((resource) => {
  if (resource) {
    console.log("成功匹配:", resource.name);
  } else {
    console.log("沒有匹配資源");
  }
});

export { findAuthoritativeResource };
