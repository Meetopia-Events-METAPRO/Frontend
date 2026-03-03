'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { fetchEvenimente } from '@/app/api/evenimentService/evenimentService';
import { deleteEvent } from '@/app/api/evenimentService/deleteevent';
import { updateEvent } from '@/app/api/evenimentService/updateevent';
import {Textarea} from "@/components/ui/textarea";

function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function ManageEvents() {
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const { data: evenimente = [], isLoading, error } = useQuery({
        queryKey: ['evenimente'],
        queryFn: fetchEvenimente,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries(['evenimente']);
            setIsConfirmingDelete(null);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateEvent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['evenimente']);
            setEditingId(null);
        },
    });

    const handleEdit = (event) => {
        setEditingId(event.id);
        setEditForm({
            nume: event.nume,
            tipEveniment: event.tipEveniment || '',
            locatie: event.locatie || '',
            dataStart: event.dataStart || '',
            dataEnd: event.dataEnd || '',
            pretBilet: event.pretBilet || '',
            descriere: event.descriere || '',
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (id) => {
        const newErrors = {};
        if (!editForm.nume) newErrors.nume = 'Numele este obligatoriu';
        if (!editForm.pretBilet) newErrors.pretBilet = 'Prețul este obligatoriu';

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

    const filteredEvenimente = evenimente.filter((ev) =>
        normalize(ev.nume).includes(normalize(searchTerm)) ||
        normalize(ev.tipEveniment).includes(normalize(searchTerm)) ||
        normalize(ev.locatie).includes(normalize(searchTerm))
    );

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <LoadingWrapper isLoading={isLoading} isError={error} data={evenimente}>
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">Manage Events</h1>

                    <Input
                        placeholder="Caută după nume, tip sau locație"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-6"
                    />

                    <div className="space-y-4">
                        {filteredEvenimente.length > 0 ? (
                            filteredEvenimente.map((ev) => (
                                <Card key={ev.id}>
                                    <CardContent className="p-4 space-y-2">
                                        {editingId === ev.id ? (
                                            <>
                                                <label className="block text-sm font-medium mb-1">Nume</label>
                                                <Input name="nume" placeholder="Nume" value={editForm.nume} onChange={handleEditChange} />
                                                {errors.nume && <p className="text-red-500 text-sm">{errors.nume}</p>}
                                                <label className="block text-sm font-medium mb-1">Tip Eveniment</label>
                                                <Input name="tipEveniment" placeholder="Tip" value={editForm.tipEveniment} onChange={handleEditChange} />
                                                <label className="block text-sm font-medium mb-1">Locatie</label>
                                                <Input name="locatie" placeholder="Locație" value={editForm.locatie} onChange={handleEditChange} />
                                                <label className="block text-sm font-medium mb-1">Data Start</label>
                                                <Input name="dataStart" type="date" value={editForm.dataStart} onChange={handleEditChange} />
                                                <label className="block text-sm font-medium mb-1">Data Sfarsit</label>
                                                <Input name="dataEnd" type="date" value={editForm.dataEnd} onChange={handleEditChange} />
                                                <label className="block text-sm font-medium mb-1">Pret</label>
                                                <Input name="pretBilet" type="number" placeholder="Preț bilet" value={editForm.pretBilet} onChange={handleEditChange} />
                                                {errors.pretBilet && <p className="text-red-500 text-sm">{errors.pretBilet}</p>}
                                                <label className="block text-sm font-medium mb-1">Descriere</label>
                                                <Textarea name="descriere" placeholder="Descriere" value={editForm.descriere} onChange={handleEditChange} />
                                                <div className="flex gap-2 mt-2">
                                                    <Button className="cursor-pointer" onClick={() => handleSave(ev.id)}>Salvează</Button>
                                                    <Button className="cursor-pointer" variant="secondary" onClick={() => setEditingId(null)}>Anulează</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p><strong>{ev.nume}</strong> ({ev.tipEveniment}) – {ev.locatie}</p>
                                                <p className="text-sm text-gray-500">{ev.descriere || 'Fără descriere'}</p>
                                                <p>📅 {ev.dataStart} → {ev.dataEnd}</p>
                                                <p>🎫 {ev.pretBilet} RON</p>

                                                <div className="flex gap-2 mt-2">
                                                    <Button className="cursor-pointer" onClick={() => handleEdit(ev)}>Editează</Button>
                                                    <Button className="cursor-pointer" onClick={() => handleDeleteClick(ev.id)} variant="destructive">Șterge</Button>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Niciun eveniment găsit.</p>
                        )}
                    </div>
                </div>
            </LoadingWrapper>

            {isConfirmingDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm border-3 border-black">
                        <h3 className="text-lg font-bold mb-2">Confirmați ștergerea</h3>
                        <p className="mb-4">Sigur doriți să ștergeți acest eveniment?</p>
                        <div className="flex justify-end gap-2">
                            <Button className="cursor-pointer" onClick={handleDeleteConfirm} variant="destructive">Confirmă</Button>
                            <Button onClick={() => setIsConfirmingDelete(null)} variant="secondary">Anulează</Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
