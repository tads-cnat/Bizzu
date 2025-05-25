import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BeeButton } from '../../../components/BeeButtons/IBeeButtons';
import { BeeTextArea } from '../../../components/BeeTextArea/BeeTextArea';
import { PaperPlaneRight } from '@phosphor-icons/react';

interface FormValues {
  conteudo: string;
  titulo: string;
}

const schema = yup.object({
  conteudo: yup.string().required('Conteúdo é obrigatório'),
  titulo: yup.string().required('Título é obrigatório'),
});

export const FormPostagem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      conteudo: '',
      titulo: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="font-medium">Título</label>
        <input
          {...register('titulo')}
          placeholder="Digite o título..."
          className={`w-full px-4 py-2 rounded-md border ${
            errors.titulo ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-teal-500`}
        />
        {errors.titulo && (
          <p className="text-red-500 text-sm mt-1">
            {errors.titulo.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium">Conteúdo</label>
        <BeeTextArea
          {...register('conteudo')}
          placeholder="Digite seu conteúdo..."
        />
      </div>

      <BeeButton
        label="Publicar"
        variante="primaria"
        icone={<PaperPlaneRight size={18} />}
        type="submit"
      />
    </form>
  );
};

export default FormPostagem;
