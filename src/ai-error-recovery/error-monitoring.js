// AI 除錯與恢復機制
function enableErrorMonitoring(renderer, scene, camera) {
  const progressKey = "virtualInstructorProgress";
  
  // 保存進度
  function saveProgress(taskId) {
    localStorage.setItem(progressKey, taskId);
    console.log(`任務 ${taskId} 進度已保存`);
  }

  // 加載進度
  function loadProgress() {
    const savedTask = localStorage.getItem(progressKey);
    if (savedTask) {
      console.log(`恢復到任務 ${savedTask}`);
      return savedTask;
    }
    console.log("沒有保存的任務進度，開始新任務");
    return null;
  }

  // 監控應用健康狀態
  function monitorApplication() {
    setInterval(() => {
      try {
        if (!renderer || !renderer.domElement) {
          console.error("渲染器異常，嘗試恢復...");
          location.reload();
        }
      } catch (error) {
        console.error("檢測到應用異常:", error);
        saveProgress("error_state");
        setTimeout(() => location.reload(), 2000);
      }
    }, 5000);
  }

  monitorApplication();
  return { saveProgress, loadProgress };
}

export { enableErrorMonitoring };