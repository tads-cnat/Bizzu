// src/App.tsx
import React from "react";
import BeeTabelaRepositorio from "./components/BeeTabelaRepositorio/BeeTabelaRepositorio";
import { FileItem } from "./components/BeeTabelaRepositorio/IBeeTabelaRepositorio";

const App: React.FC = () => {
  const mockFiles: FileItem[] = [
    { id: "1", name: "Pilha.java", daysAgo: 3 },
    { id: "2", name: "PilhaVector.java", daysAgo: 3 },
    { id: "3", name: "PilhaArray.java", daysAgo: 3 },
    { id: "4", name: "TestePilha.java", daysAgo: 3 },
    { id: "5", name: "Fila.java", daysAgo: 7 },
    { id: "6", name: "TesteFila.java", daysAgo: 7 },
  ];

  return (
    <div className="p-4 min-h-screen flex justify-center items-start">
	<div className="w-[900px]">
	  <BeeTabelaRepositorio
		userName="Luiz Fernando"
		userImage="/eu.jpg"
		lastUpdated="atualizado pela última vez a uma semana atrás"
		tags={["TADS", "EDNL", "3P"]}
		files={mockFiles}
	  />
	</div>
    </div>
  );
};

export default App;
