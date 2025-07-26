import { IBeeCategoria } from "../interfaces/IBeeCategoria";
import { ITag } from "../interfaces/Postagem";

const tagsCategory = (categoriasIds: number[], categorias:IBeeCategoria[]): ITag[] => {
        if (!categoriasIds || categoriasIds.length === 0) return [];

        const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
            tec: "magenta",
            mat: "orange",
            per: "cyan",
        };

        const defaultColor = "#6FCF97";

        // Filtrar e mapear categorias válidas
        const tagsValidas: ITag[] = [];

        for (const categoriaId of categoriasIds) {
            const categoria = categorias.find((c) => c.id === categoriaId);

            if (
                categoria &&
                categoria.tipo &&
                (categoria.tipo === "tec" ||
                    categoria.tipo === "mat" ||
                    categoria.tipo === "per")
            ) {
                tagsValidas.push({
                    label: categoria.nome,
                    color: coresPorTipo[categoria.tipo] || defaultColor,
                    tipo: categoria.tipo,
                });
            }
        }
    
        return tagsValidas; 
}

export default tagsCategory;