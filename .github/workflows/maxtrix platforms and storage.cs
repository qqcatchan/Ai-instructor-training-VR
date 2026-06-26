name: Multi-platform VR Build with Options

on:
  push:
    branches: [ main ]
  # 啟用手動觸發選單，讓你可以自由選擇設定
  workflow_dispatch:
    inputs:
      storage_type:
        description: '選擇儲存方式 (Storage Type)'
        required: true
        default: 'github_artifacts'
        type: choice
        options:
          - 'github_artifacts'   # 選項 A：本身儲存（GitHub 內建免費 Artifacts，會自動過期）
          - 'github_releases'    # 選項 B：免費網上公開儲存（發佈成 Release 方便其他人下載）
          - 'skip_storage'       # 選項 C：不儲存（單純測試程式碼能不能成功編譯）
      debug_mode:
        description: '是否開啟除錯模式 (Enable Debug Mode)'
        required: true
        default: false
        type: boolean            # 打勾代表 True，不打勾代表 False

jobs:
  build:
    name: Build for ${{ matrix.targetPlatform }}
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        targetPlatform: [StandaloneWindows64, Android]

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          lfs: true # VR 專案通常有大檔案，開啟 LFS 支援

      # ==========================================
      # 【Debug 功能 1】在建置前印出環境變數與參數
      # ==========================================
      - name: Debug - Print Environment & Inputs
        if: ${{ inputs.debug_mode == true || github.event_name == 'push' }}
        run: |
          echo "=== DEBUG INFO ==="
          echo "觸發事件 (Event): ${{ github.event_name }}"
          echo "目標平台 (Platform): ${{ matrix.targetPlatform }}"
          echo "儲存選擇 (Storage): ${{ inputs.storage_type }}"
          echo "工作目錄 (Workspace): $GITHUB_WORKSPACE"
          echo "=== 檔案清單 ==="
          ls -la

      # 執行 Unity 建置 (以 game-ci 為例)
      - name: Run Unity Build
        uses: game-ci/unity-builder@v4
        with:
          targetPlatform: ${{ matrix.targetPlatform }}
          # 如果開啟 Debug，可以選擇打出帶有除錯資訊的開發者版本 (Development Build)
          development: ${{ inputs.debug_mode }} 

      # ==========================================
      # 【功能 2】本身儲存 (GitHub Artifacts)
      # ==========================================
      - name: Upload to GitHub Artifacts (本身儲存)
        # 當手動選擇 artifacts，或者程式碼 push 自動觸發時執行
        if: ${{ inputs.storage_type == 'github_artifacts' || github.event_name == 'push' }}
        uses: actions/upload-artifact@v4
        with:
          name: VR-Build-${{ matrix.targetPlatform }}
          path: build/${{ matrix.targetPlatform }}
          retention-days: 7 # 設定 7 天後自動刪除，免費且不佔用永久空間

      # ==========================================
      # 【功能 3】免費網上儲存 (GitHub Releases)
      # ==========================================
      - name: Create GitHub Release and Upload Build (網上儲存)
        if: ${{ inputs.storage_type == 'github_releases' }}
        uses: softprops/action-gh-release@v2
        with:
          tag_name: build-${{ github.run_number }}
          name: VR Training Build v${{ github.run_number }}
          draft: false
          prerelease: false
          # 將打包出來的資料夾內所有檔案上傳
          files: build/${{ matrix.targetPlatform }}/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub 自動產生的金鑰，免付費

      # ==========================================
      # 【Debug 功能 4】建置後驗證檔案是否存在
      # ==========================================
      - name: Debug - Verify Build Output
        if: ${{ inputs.debug_mode == true }}
        run: |
          echo "=== 檢查打包結果 ==="
          if [ -d "build/${{ matrix.targetPlatform }}" ]; then
            echo "✅ 成功：找不到資料夾！以下為輸出檔案："
            ls -R build/${{ matrix.targetPlatform }}
          else
            echo "❌ 失敗：找不到打包輸出資料夾！"
            exit 1
          fi
