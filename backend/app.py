from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite o CORS para comunicação com o front-end

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'pdf' not in request.files or 'csv' not in request.files:
        return jsonify({'error': 'Ambos os arquivos devem ser enviados (PDF e CSV).'}), 400

    pdf_file = request.files['pdf']
    csv_file = request.files['csv']

    # Obter informações dos arquivos
    pdf_name = pdf_file.filename
    csv_name = csv_file.filename
    pdf_content = pdf_file.read().decode('latin1')  # Supondo que o PDF seja em texto legível
    csv_content = csv_file.read().decode('utf-8')

    # Exibir informações no console
    print(f"PDF: {pdf_name}")
    print(f"Conteúdo do PDF:\n{pdf_content}")
    print(f"CSV: {csv_name}")
    print(f"Conteúdo do CSV:\n{csv_content}")

    return jsonify({'message': 'Arquivos recebidos com sucesso.', 'pdf_name': pdf_name, 'csv_name': csv_name})

if __name__ == '__main__':
    app.run(debug=True)