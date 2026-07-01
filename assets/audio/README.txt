# assets/audio README

請把音訊檔上傳到此資料夾，檔名請為：

- opera_sample.mp3   (建議使用 MP3，程式會載入 /assets/audio/opera_sample.mp3)

如果你只有 MP4（例如 gemini_generated_video_55B076B0.mp4），請在本機使用 ffmpeg 轉檔：

ffmpeg -i gemini_generated_video_55B076B0.mp4 -vn -ar 44100 -ac 2 -b:a 128k opera_sample.mp3

上傳方式：
- GitHub 網頁：進入 branch integration/chinese-opera-vr -> Add file -> Upload files。將 opera_sample.mp3 上傳到 assets/audio/，Commit 即可。
- 或本地 git：
  git fetch origin
  git checkout integration/chinese-opera-vr
  mkdir -p assets/audio
  cp /path/to/opera_sample.mp3 assets/audio/
  git add assets/audio/opera_sample.mp3
  git commit -m "Add opera sample audio"
  git push origin integration/chinese-opera-vr

完成上傳後，打開比較頁面並按 Create pull request，或把 PR 連結貼給我，我會幫你做 smoke test。
