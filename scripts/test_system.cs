using UnityEngine;

public class TestSystem : MonoBehaviour
{
    private AIInstructorSystem aiSystem;

    void Start()
    {
        aiSystem = new AIInstructorSystem();

        // 測試意見收集 + 回應
        aiSystem.AddFeedback("覺得太快");
        aiSystem.AddFeedback("多人互動場景好");

        // 測試投票系統
        aiSystem.CastVote("新增場景");
        aiSystem.CastVote("新增場景");
        aiSystem.CastVote("改善速度");

        // 測試排行榜
        aiSystem.UpdateScore("Alice", 20);
        aiSystem.UpdateScore("Bob", 15);
        aiSystem.UpdateScore("Charlie", 30);

        // 測試徽章系統
        aiSystem.AwardBadge("Alice", "投票之星");
        aiSystem.AwardBadge("Bob", "積極參與");

        // 測試任務系統
        aiSystem.AssignTask("Charlie", "完成第一堂課");
        aiSystem.CompleteTask("Charlie", "完成第一堂課");

        // 測試情緒感知 (模擬)
        EmotionSensor sensor = new EmotionSensor();
        sensor.Update();
    }
}
