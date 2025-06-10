import type React from "react"
import type { IBeePerfilResumoCard } from "./IBeePerfilResumoCard"

const BeePerfilResumoCard: React.FC<IBeePerfilResumoCard> = ({ nome, descricao, linkedinUrl, bannerUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div
        className="h-24 bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-400"
        style={{
          backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#333333] font-poppins mb-2">{nome}</h2>

        <p className="text-sm text-[#666666] font-poppins mb-3 leading-relaxed">{descricao}</p>

        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0066cc] font-poppins hover:underline break-all"
          >
            {linkedinUrl}
          </a>
        )}
      </div>
    </div>
  )
}

export default BeePerfilResumoCard
