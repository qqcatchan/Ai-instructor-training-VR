flowchart TD
    User[用家] --> Issues[GitHub Issues 提交]
    User --> PR[Pull Request 建立]
    User --> Email[Email :qckchan@gmail.com [聯絡維護者]

    Issues --> Maintainers[Maintainers 維護者]
    PR --> Maintainers
    Email --> Maintainers

    Maintainers --> Response[回覆 / 處理]
    Response --> User
