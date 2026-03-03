'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchParteneri } from '@/app/api/parteneri/parteneriService';
import { deletePartener } from '@/app/api/parteneri/delete';
import { updatePartener } from '@/app/api/parteneri/update';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingWrapper } from '@/components/LoadingWrapper';

function normalize(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export default function ManagePartners() {
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const { data: parteneri = [], isLoading, error } = useQuery({
        queryKey: ['parteneri'],
        queryFn: fetchParteneri,
    });

    const deleteMutation = useMutation({
        mutationFn: deletePartener,
        onSuccess: () => {
            queryClient.invalidateQueries(['parteneri']);
            setIsConfirmingDelete(null);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updatePartener,
        onSuccess: () => {
            queryClient.invalidateQueries(['parteneri']);
            setEditingId(null);
        },
    });

    const handleEdit = (partner) => {
        setEditingId(partner.id);
        setEditForm({
            username: partner.username,
            email: partner.email,
            descriere: partner.descriere || '',
            linkBilete: partner.linkBilete || ''
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
            setIsConfirmingDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setIsConfirmingDelete(null);
    };

    const filteredParteneri = parteneri.filter((partner) =>
        normalize(partner.username).includes(normalize(searchTerm)) ||
        normalize(partner.email).includes(normalize(searchTerm))
    );

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <LoadingWrapper isLoading={isLoading} isError={error} data={parteneri}>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">Manage Partners</h1>

                    <div className="mb-6">
                        <Input
                            placeholder="Caută după username sau email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredParteneri.length > 0 ? (
                            filteredParteneri.map((partner) => (
                                <Card key={partner.id}>
                                    <CardContent className="p-4 space-y-2">
                                        {editingId === partner.id ? (
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
                                                <label className="block text-sm font-medium mb-1">Descriere</label>
                                                <Input
                                                    name="descriere"
                                                    value={editForm.descriere}
                                                    onChange={handleEditChange}
                                                    placeholder="Descriere"
                                                />
                                                <label className="block text-sm font-medium mb-1">Link Bilete</label>
                                                <Input
                                                    name="linkBilete"
                                                    value={editForm.linkBilete}
                                                    onChange={handleEditChange}
                                                    placeholder="Link bilete"
                                                />
                                                <div className="flex gap-2">
                                                    <Button className="cursor-pointer" onClick={() => handleSave(partner.id)}>Salvează</Button>
                                                    <Button className="cursor-pointer" variant="secondary" onClick={() => setEditingId(null)}>Anulează</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p><strong>{partner.username}</strong> ({partner.email})</p>
                                                <p className="text-sm text-gray-500">{partner.descriere || 'Fără descriere'}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <Button className="cursor-pointer" onClick={() => handleEdit(partner)}>Editează</Button>
                                                    <Button className="cursor-pointer" onClick={() => handleDeleteClick(partner.id)} variant="destructive">Șterge</Button>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Niciun partener găsit.</p>
                        )}
                    </div>
                </div>
            </LoadingWrapper>

            {isConfirmingDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full border-3 border-black">
                        <h3 className="text-lg font-bold">Confirmați ștergerea</h3>
                        <p>Sigur doriți să ștergeți acest partener?</p>
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
