'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUtilizatori } from '@/app/api/utilizatori/utilizatorService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { useState } from 'react';
import { updateUtilizator } from '@/app/api/utilizatori/update';
import { deleteUtilizator } from '@/app/api/utilizatori/delete';

function normalize(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export default function UserPanel() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);
    const [errors, setErrors] = useState({});

    const { data: utilizatori = [], isLoading, error } = useQuery({
        queryKey: ['utilizatori'],
        queryFn: fetchUtilizatori,
    });

    // Filtrare utilizatori după searchTerm
    const filteredUtilizatori = utilizatori.filter((utilizator) =>
        normalize(utilizator.username).includes(normalize(searchTerm)) ||
        normalize(utilizator.email).includes(normalize(searchTerm))
    );

    // Mutation pentru update utilizator
    const updateMutation = useMutation({
        mutationFn: updateUtilizator,
        onSuccess: () => {
            queryClient.invalidateQueries(['utilizatori']);
            setEditingId(null);
        },
    });

    // Mutation pentru ștergere utilizator
    const deleteMutation = useMutation({
        mutationFn: deleteUtilizator,
        onSuccess: () => {
            queryClient.invalidateQueries(['utilizatori']);
            setIsConfirmingDelete(null);
        },
    });

    const handleEdit = (utilizator) => {
        setEditingId(utilizator.id);
        setEditForm({
            username: utilizator.username,
            email: utilizator.email,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (id) => {
        const newErrors = {};
        if (!editForm.username) newErrors.username = 'Username-ul este obligatoriu';
        if (!editForm.email) newErrors.email = 'Email-ul este obligatoriu';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            updateMutation.mutate({ id, data: editForm });
        }
    };

    const handleDeleteClick = (id) => {
        setIsConfirmingDelete(id);
    };

    const handleDeleteConfirm = () => {
        if (isConfirmingDelete) {
            deleteMutation.mutate(isConfirmingDelete);
        }
    };

    const handleDeleteCancel = () => {
        setIsConfirmingDelete(null);
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <LoadingWrapper isLoading={isLoading} isError={error} data={utilizatori}>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>

                    <div className="mb-6">
                        <Input
                            placeholder="Caută după username sau email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredUtilizatori.length > 0 ? (
                            filteredUtilizatori.map((utilizator) => (
                                <Card key={utilizator.id}>
                                    <CardContent className="p-4 space-y-2">
                                        {editingId === utilizator.id ? (
                                            <>
                                                <label className="block text-sm font-medium mb-1">Username</label>
                                                <Input
                                                    name="username"
                                                    value={editForm.username}
                                                    onChange={handleEditChange}
                                                    placeholder="Username"
                                                />
                                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                                                <label className="block text-sm font-medium mb-1">Email</label>
                                                <Input
                                                    name="email"
                                                    value={editForm.email}
                                                    onChange={handleEditChange}
                                                    placeholder="Email"
                                                />
                                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                                                <div className="flex gap-2">
                                                    <Button className="cursor-pointer" onClick={() => handleSave(utilizator.id)}>Salvează</Button>
                                                    <Button className="cursor-pointer" variant="secondary" onClick={() => setEditingId(null)}>Anulează</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p><strong>{utilizator.username}</strong> ({utilizator.email})</p>
                                                <div className="flex gap-2 mt-2">
                                                    <Button className="cursor-pointer" onClick={() => handleEdit(utilizator)}>Editează</Button>
                                                    <Button className="cursor-pointer" onClick={() => handleDeleteClick(utilizator.id)} variant="destructive">Șterge</Button>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Niciun utilizator găsit.</p>
                        )}
                    </div>
                </div>
            </LoadingWrapper>

            {isConfirmingDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full border-3 border-black">
                        <h3 className="text-lg font-bold">Confirmați ștergerea</h3>
                        <p>Sigur doriți să ștergeți acest utilizator?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button className="cursor-pointer" onClick={handleDeleteConfirm} variant="destructive">Confirmă</Button>
                            <Button onClick={handleDeleteCancel} variant="secondary">Anulează</Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
