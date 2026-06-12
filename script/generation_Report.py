import json
from fpdf import FPDF
import sys

def generate_report(input_file, output_file):
    # 讀取測試結果 JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 建立 PDF 報告
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="AI 系統測試報告", ln=True, align="C")
    pdf.ln(10)

    # 顯示模組測試結果
    for module, result in data.items():
        pdf.cell(200, 10, txt=f"模組: {module}", ln=True)
        pdf.multi_cell(0, 10, txt=f"測試結果: {result}")
        pdf.ln(5)

    # 儲存 PDF
    pdf.output(output_file)
    print(f"✅ 測試報告已生成: {output_file}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("用法: python generate_report.py --input input.json --output output.pdf")
    else:
        input_file = sys.argv[sys.argv.index("--input")+1]
        output_file = sys.argv[sys.argv.index("--output")+1]
        generate_report(input_file, output_file)
