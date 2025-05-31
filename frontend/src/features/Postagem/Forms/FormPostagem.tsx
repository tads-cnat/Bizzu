"use client"

import { useEffect, useState } from "react"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { BeeButton } from "../../../components/BeeButtons/BeeButtons"
import { BeeTextArea } from "../../../components/BeeTextArea/BeeTextArea"
import { PaperPlaneRight, Hexagon } from "@phosphor-icons/react"
import PostagemService from "../../../services/models/PostagemService"
import type { IFormPostagem } from "./IFormPostagem"
import BeeArquivo from "../../../components/BeeArquivo/BeeArquivo"
import BeeAnexos from "../../../components/BeeAnexos/BeeAnexos"
import BeeSelect from "../../../components/BeeSelect/BeeSelect"
import BeeFiltroCategorias from "../../../components/BeeFiltroCategorias/BeeFiltroCategorias"
import ComunidadeService from "../../../services/models/ComunidadeService"
import CategoriaService from "../../../services/models/CategoriaService"
import axios, { type AxiosError } from "axios"

// Definição da interface para comunidade
interface Comunidade {
  label: string
  value: string | number
}

// Definição da interface para categoria
interface Categoria {
  id: number
  nome: string
  tipo: "tec" | "mat" | "per"
}

// Interface para os valores do formulário
interface FormValues {
  texto: string
  imagem?: File | null
  comunidade?: Comunidade | undefined
  categorias: number[]
}

// Schema de validação com Yup
const schema = yup.object().shape({
  texto: yup
    .string()
    .required("Conteúdo é obrigatório")
    .min(1, "Conteúdo não pode estar vazio")
    .max(200, "Conteúdo não pode ter mais de 200 caracteres"),
  imagem: yup.mixed().nullable().optional(),
  comunidade: yup
    .object()
    .shape({
      label: yup.string().optional(),
      value: yup.mixed().optional(),
    })
    .nullable()
    .optional(),
  categorias: yup.array().of(yup.number()).min(1, "Selecione pelo menos uma categoria"),
})

export const FormPostagem = ({
  idPostagem,
  tipoForm,
  onSubmitCallback,
}: IFormPostagem & { onSubmitCallback?: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [comunidades, setComunidades] = useState<Comunidade[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [termoPesquisa, setTermoPesquisa] = useState("")
  const [anexoPath, setAnexoPath] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      texto: "",
      imagem: null,
      comunidade: undefined,
      categorias: [],
    },
  })

  const categoriasSelecionadas = watch("categorias")

  // Carregar comunidades do backend
  useEffect(() => {
    const loadComunidades = async () => {
      try {
        const response = await ComunidadeService.listAll()
        if (response.data && Array.isArray(response.data)) {
          const comunidadesFormatadas = response.data.map((comunidade: any) => ({
            label: comunidade.nome || comunidade.title,
            value: comunidade.id,
          }))
          setComunidades(comunidadesFormatadas)
          console.log("Comunidades carregadas do backend:", comunidadesFormatadas)
        } else {
          console.error("Formato de resposta inválido para comunidades:", response.data)
          setComunidades([])
        }
      } catch (error) {
        console.error("Erro ao carregar comunidades:", error)
        setComunidades([])
      }
    }

    loadComunidades()
  }, [])

  // Carregar categorias do backend
  useEffect(() => {
    const loadCategorias = async () => {
      setLoading(true)
      try {
        const response = await CategoriaService.listAll()

        if (response.data && Array.isArray(response.data)) {
          setCategorias(response.data)
          console.log("Categorias carregadas com sucesso:", response.data)
        } else {
          console.error("Formato de resposta inválido para categorias:", response.data)
          setCategorias([])
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error)
        setCategorias([])
      } finally {
        setLoading(false)
      }
    }

    loadCategorias()
  }, [])

  // Carregar dados para edição
  useEffect(() => {
    const loadPostagem = async () => {
      if (tipoForm === "editar" && idPostagem) {
        setLoadingData(true)
        try {
          const response = await PostagemService.get(idPostagem)
          const postagem = response.data

          setValue("texto", postagem.texto || "")

          // Se houver imagem associada
          if (postagem.imagem) {
            setAnexoPath(postagem.imagem)
          }

          // Se houver comunidade associada
          if (postagem.comunidade) {
            setValue("comunidade", {
              label: postagem.comunidade.nome || postagem.comunidade.title,
              value: postagem.comunidade.id,
            })
          }

          // Se houver categorias associadas
          if (postagem.categorias && postagem.categorias.length > 0) {
            const categoriasIds = postagem.categorias.map((cat: any) => cat.id)
            setValue("categorias", categoriasIds)
            console.log("Categorias carregadas para edição:", categoriasIds)
          }
        } catch (error) {
          console.error("Erro ao carregar postagem:", error)
          alert("Erro ao carregar dados da postagem")
        } finally {
          setLoadingData(false)
        }
      }
    }

    loadPostagem()
  }, [idPostagem, tipoForm, setValue])

  // Função para filtrar categorias por termo de pesquisa
  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
  )

  // Função para selecionar/deselecionar categoria
  const aoSelecionarCategoria = (categoriaId: number) => {
    const categoriasAtuais = getValues("categorias") || []
    let novasCategorias

    if (categoriasAtuais.includes(categoriaId)) {
      novasCategorias = categoriasAtuais.filter((id) => id !== categoriaId)
    } else {
      novasCategorias = [...categoriasAtuais, categoriaId]
    }

    setValue("categorias", novasCategorias, { shouldValidate: true })
    console.log("Categorias atualizadas:", novasCategorias)
  }

  // Função para lidar com a seleção de arquivo
  const handleFileChange = (file: File | null) => {
    setValue("imagem", file)
    if (file) {
      setAnexoPath(file.name)
    } else {
      setAnexoPath(null)
    }
  }

  // Função para remover anexo
  const handleRemoveAnexo = () => {
    setValue("imagem", null)
    setAnexoPath(null)
  }

  // Função para lidar com a seleção de comunidade
  const handleComunidadeChange = (value: Comunidade) => {
    setValue("comunidade", value.value ? value : undefined)
    console.log("Comunidade selecionada:", value)
  }

  // Submit
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("texto", data.texto)

      if (data.imagem) {
        formData.append("imagem", data.imagem)
      }

      if (data.comunidade?.value) {
        formData.append("comunidade", String(data.comunidade.value))
      }

      // Adicionar categorias
      if (data.categorias && data.categorias.length > 0) {
        data.categorias.forEach((categoriaId) => {
          formData.append("categorias", String(categoriaId))
        })
      }

      console.log("Dados do formulário:", {
        texto: data.texto,
        imagem: data.imagem,
        comunidade: data.comunidade,
        categorias: data.categorias,
      })

      if (tipoForm === "editar" && idPostagem) {
        await PostagemService.put(idPostagem, formData)
        alert("Postagem atualizada com sucesso!")
      } else {
        await PostagemService.post(formData)
        alert("Postagem criada com sucesso!")
      }

      reset()
      setAnexoPath(null)
      onSubmitCallback?.()
    } catch (error) {
      console.error("Erro ao salvar postagem:", error)

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        console.error("Dados do erro:", axiosError.response?.data)
        alert(`Erro ao salvar postagem: ${JSON.stringify(axiosError.response?.data || "Erro desconhecido")}`)
      } else {
        alert("Erro ao salvar postagem. Verifique sua conexão.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return <div className="text-center py-4">Carregando dados...</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Área de Texto */}
      <div>
        <Controller
          name="texto"
          control={control}
          render={({ field }) => (
            <BeeTextArea
              id="texto"
              label="Conteúdo da Postagem"
              placeholder="Digite o conteúdo da sua postagem..."
              defaultValue={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              rows={4}
            />
          )}
        />
        {errors.texto && <p className="text-red-500 text-sm mt-1">{errors.texto.message}</p>}
        <p className="text-gray-500 text-xs mt-1">{watch("texto")?.length || 0}/200 caracteres</p>
      </div>

      {/* Upload de Arquivo */}
      <div>
        <Controller
          name="imagem"
          control={control}
          render={({ field }) => (
            <BeeArquivo value={field.value} onChange={handleFileChange} error={errors.imagem?.message} />
          )}
        />

        {/* Mostrar anexo se existir */}
        {anexoPath && (
          <div className="mt-2">
            <BeeAnexos path={anexoPath} onDelete={handleRemoveAnexo} />
          </div>
        )}
      </div>

      {/* Select de Comunidade */}
      {comunidades.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Comunidade</label>
          <Controller
            name="comunidade"
            control={control}
            render={({ field }) => (
              <BeeSelect
                options={comunidades}
                placeholder="Selecione uma comunidade"
                icone={Hexagon}
                value={field.value}
                onChange={handleComunidadeChange}
                error={errors.comunidade?.message}
              />
            )}
          />
        </div>
      )}

      {/* Seleção de Categorias */}
      {categorias.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Categorias *</label>
          <BeeFiltroCategorias
            categorias={categoriasFiltradas}
            categoriasSelecionadas={categoriasSelecionadas || []}
            aoSelecionarCategoria={aoSelecionarCategoria}
            aoPesquisar={setTermoPesquisa}
          />
          {errors.categorias && <p className="text-red-500 text-sm mt-1">{errors.categorias.message}</p>}
          {categoriasSelecionadas && categoriasSelecionadas.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Categorias selecionadas: {categoriasSelecionadas.length}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {categoriasSelecionadas.map((catId) => {
                  const categoria = categorias.find((cat) => cat.id === catId)
                  return categoria ? (
                    <span
                      key={catId}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#FCBD18] text-gray-900"
                    >
                      {categoria.nome}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão de Submit */}
      <BeeButton
        label={tipoForm === "editar" ? "Atualizar Postagem" : "Publicar Postagem"}
        variante="primaria"
        icone={<PaperPlaneRight size={18} />}
        desabilitado={loading}
      />

      {loading && (
        <p className="text-center text-gray-600">{tipoForm === "editar" ? "Atualizando..." : "Publicando..."}</p>
      )}
    </form>
  )
}

export default FormPostagem;
