import { Upload } from "@phosphor-icons/react";
import { forwardRef } from "react";

interface BeeArquivoProps {
  onChange?: (file: File | null) => void;
  value?: File | null;
  error?: string;
}

const BeeArquivo = forwardRef<HTMLInputElement, BeeArquivoProps>(
  ({ onChange, value, error }, ref) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      onChange?.(file);
    };

    return (
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Foto da postagem
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <Upload
              aria-hidden="true"
              className="mx-auto size-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
              >
                <span>Coloque um arquivo</span>
                <input
                  ref={ref}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            {value && (
              <p className="text-sm text-green-600 mt-2">
                Arquivo selecionado: {value.name}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

BeeArquivo.displayName = "BeeArquivo";

export default BeeArquivo;