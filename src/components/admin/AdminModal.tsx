import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/auth';
import { User } from '../../types';

const adminSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  active: z.boolean().default(true)
});

type AdminFormData = z.infer<typeof adminSchema>;

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin?: User | null;
}

export function AdminModal({ isOpen, onClose, admin }: AdminModalProps) {
  const { addAdmin, updateAdmin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
    defaultValues: admin || {
      active: true
    }
  });

  const onSubmit = (data: AdminFormData) => {
    if (admin) {
      updateAdmin(admin.id, data);
    } else {
      addAdmin(data);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Fechar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {admin ? 'Editar Administrador' : 'Novo Administrador'}
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <Input
                label="Nome"
                {...register('name')}
                error={errors.name?.message}
              />
              
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
              
              <Input
                label="Senha"
                type="password"
                {...register('password')}
                error={errors.password?.message}
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('active')}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Ativo
                </label>
              </div>

              <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {admin ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}