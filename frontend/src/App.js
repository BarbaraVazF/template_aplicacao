import React, { useState } from "react";
import axios from "axios";

function App() {
  const [pdf, setPdf] = useState(null);
  const [csv, setCsv] = useState(null);

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleCsvChange = (e) => {
    setCsv(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!pdf || !csv) {
      alert("Por favor, envie ambos os arquivos!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("csv", csv);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`Arquivos enviados:\nPDF: ${response.data.pdf_name}\nCSV: ${response.data.csv_name}`);
    } catch (error) {
      alert("Erro ao enviar arquivos: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload de Arquivos</h1>
      <input type="file" accept=".pdf" onChange={handlePdfChange} />
      <br />
      <input type="file" accept=".csv" onChange={handleCsvChange} />
      <br />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default App;

