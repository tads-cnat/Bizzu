import React from 'react';
import { File } from 'phosphor-react';
import { IBeeTabelaRepositorio, FileItem } from './IBeeTabelaRepositorio';

const BeeTabelaRepositorio: React.FC<IBeeTabelaRepositorio> = ({
  userName,
  userImage,
  lastUpdated,
  tags,
  files,
}) => {
  return (
    <div className="border-2 border-[#FCBD18] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-[#DCCEB1]/30">
        <div className="flex items-center gap-3">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <span className="font-semibold text-gray-800">{userName}</span>
            <p className="text-sm text-gray-600">{lastUpdated}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[#FCBD18] text-xs font-medium rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        {files.map((file: FileItem) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 border-t"
          >
            <div className="flex items-center gap-2">
              <File size={20} weight="regular" className="text-[#FCBD18]" />
              <span className="text-sm text-gray-800">{file.name}</span>
            </div>
            <span className="text-sm text-gray-600">
              {file.daysAgo} dias atrás
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeeTabelaRepositorio;
