'use client';

import { useState } from 'react';
import { User } from '@prisma/client';

import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { editUser, removeUser } from '@/actions/admin';
import { Edit, Trash2, Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UserTableProps {
  users: User[];
  currentUserId: string | undefined;
}

export function UserTable({ users, currentUserId }: UserTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [userDelete, setUserDelete] = useState<string | null>(null);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditName(user.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleSave = async () => {
    if (!editingId || !editName.trim()) return;

    setIsSubmit(true);

    const result = await editUser({
      id: editingId,
      name: editName,
    });

    setIsSubmit(false);

    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success(result.success);
    }

    setEditingId(null);
    setEditName('');
  };

  const hadleDelete = async () => {
    if (!userDelete) return;

    setIsSubmit(true);

    const result = await removeUser(userDelete);

    setIsSubmit(false);
    setUserDelete(null);

    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success(result.success);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {editingId === user.id ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="max-w-[200px]"
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {editingId === user.id ? (
                      <>
                        <Button size="sm" onClick={handleSave} disabled={isSubmit}>
                          <Check className="size-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={isSubmit}
                        >
                          <X className="size-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setUserDelete(user.id)}
                          disabled={user.id === currentUserId}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!userDelete} onOpenChange={() => setUserDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmit}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={hadleDelete}
              disabled={isSubmit}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
