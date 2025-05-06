import React, { useState } from 'react';
import { IBeeAbasPerfil } from './IBeeAbasPerfil';

const BeeAbasPerfil: React.FC<IBeeAbasPerfil> = ({ abas, onAbaSelect }) => {
  const [abaAtiva, setAbaAtiva] = useState(abas[0]);

  const handleSelect = (aba: string) => {
    setAbaAtiva(aba);
    if (onAbaSelect) onAbaSelect(aba);
  };

  return (
    <div className="flex gap-8 bg-transparent py-4 px-6 rounded-md font-poppins">
      {abas.map((aba) => (
        <button
          key={aba}
          onClick={() => handleSelect(aba)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200
            ${abaAtiva === aba
              ? 'bg-[#FCBD18] text-white'
              : 'bg-transparent text-[#333333] hover:text-gray-700'}`}
        >
          {aba}
        </button>
      ))}
    </div>
  );
};

export default BeeAbasPerfil;
