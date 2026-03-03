'use client';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserInfo } from '@/app/api/utilizatori/getUserInfo';
import { updateUtilizator } from '@/app/api/utilizatori/update';
import { updatePartener } from '@/app/api/parteneri/update';
import { getEvenimenteUtilizator } from '@/app/api/utilizatori/getEvenimenteUtilizator';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, User, Calendar, Link as LinkIcon, Info } from 'lucide-react';

export default function UserInfoWrapper() {
    const [role, setRole] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) setRole(storedRole);
    }, []);

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['userInfo', role],
        queryFn: () => getUserInfo(role),
        enabled: !!role,
        onSuccess: (data) => setFormData(data),
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const { data: evenimente, isLoading: loadingEvenimente, isError: errorEvenimente } = useQuery({
        queryKey: ['evenimenteUtilizator', role],
        queryFn: getEvenimenteUtilizator,
        enabled: !!user && role === 'user',
    });

    const utilizatorMutation = useMutation({
        mutationFn: ({ id, data }) => updateUtilizator({ id, data }),
        onSuccess: () => {
            setEditMode(false);
            location.reload();
        },
        onError: (error) => alert(error.message || 'Eroare la actualizarea utilizatorului!'),
    });

    const partenerMutation = useMutation({
        mutationFn: ({ id, data }) => updatePartener({ id, data }),
        onSuccess: () => {
            setEditMode(false);
            location.reload();
        },
        onError: (error) => alert(error.message || 'Eroare la actualizarea partenerului!'),
    });

    const handleSave = () => {
        if (!user) return;

        const payload = {
            id: user.id,
            data: formData,
        };

        if (role === 'partner') {
            partenerMutation.mutate(payload);
        } else {
            utilizatorMutation.mutate(payload);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <LoadingWrapper isLoading={isLoading || loadingEvenimente} isError={isError} data={user}>
            {user && (
                <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                {role === 'partner' ? 'Profil Organizator' : 'Profilul meu'}
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {role === 'partner'
                                    ? 'Gestionează informațiile organizatorului'
                                    : 'Vezi și actualizează detaliile contului tău'}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="h-40 bg-gradient-to-r from-gray-200 to-blue-50 relative">
                                <div className="absolute -bottom-16 left-6 h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center">
                                    <span className="text-4xl font-bold text-indigo-600">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Conținut profil */}
                            <div className="px-6 pt-20 pb-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                                        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                            {role === 'partner' ? 'Organizator' : 'Utilizator'}
                                        </div>
                                    </div>

                                    {!editMode && (
                                        <Button
                                            onClick={() => setEditMode(true)}
                                            className="bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Editează profil
                                        </Button>
                                    )}
                                </div>

                                {/* Sectiuni profil */}
                                <div className="space-y-8">
                                    {/* Sectiunea Informații de bază */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Informații de bază</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="flex items-center text-sm font-medium text-gray-700">
                                                    <Mail className="h-5 w-5 mr-2 text-indigo-600" />
                                                    Adresă email
                                                </label>
                                                {editMode ? (
                                                    <Input
                                                        name="email"
                                                        value={formData.email || ''}
                                                        onChange={handleChange}
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 pl-7">{user.email}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center text-sm font-medium text-gray-700">
                                                    <User className="h-5 w-5 mr-2 text-indigo-600" />
                                                    Nume utilizator
                                                </label>
                                                {editMode ? (
                                                    <Input
                                                        name="username"
                                                        value={formData.username || ''}
                                                        onChange={handleChange}
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 pl-7">{user.username}</p>
                                                )}
                                            </div>

                                            {role === 'user' && (
                                                <div className="space-y-2">
                                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                                        <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                                                        Vârstă
                                                    </label>
                                                    <p className="text-gray-900 pl-7">{user.varsta} ani</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sectiunea specifică rolului */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                                            {role === 'partner' ? 'Informații organizator' : 'Evenimentele mele'}
                                        </h3>

                                        {role === 'partner' ? (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                                        <Info className="h-5 w-5 mr-2 text-indigo-600" />
                                                        Descriere
                                                    </label>
                                                    {editMode ? (
                                                        <Textarea
                                                            name="descriere"
                                                            value={formData.descriere || ''}
                                                            onChange={handleChange}
                                                            rows={4}
                                                        />
                                                    ) : (
                                                        <p className="text-gray-900 pl-7">
                                                            {user.descriere || 'Nu există descriere adăugată'}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                                        <LinkIcon className="h-5 w-5 mr-2 text-indigo-600" />
                                                        Link bilete
                                                    </label>
                                                    {editMode ? (
                                                        <Input
                                                            name="linkBilete"
                                                            value={formData.linkBilete || ''}
                                                            onChange={handleChange}
                                                        />
                                                    ) : user.linkBilete ? (
                                                        <a
                                                            href={user.linkBilete}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-600 hover:underline pl-7"
                                                        >
                                                            {user.linkBilete}
                                                        </a>
                                                    ) : (
                                                        <p className="text-gray-500 pl-7">Nu există link adăugat</p>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="space-y-4">
                                                {evenimente?.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {evenimente.map((event) => (
                                                            <div key={event.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                                                <Badge className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900">{event.nume}</h4>
                                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                                                                        <span>📍 {event.locatie}</span>
                                                                        <span>📅 {event.dataStart} - {event.dataEnd}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-6 text-center bg-gray-50 rounded-lg border border-gray-200">
                                                        <p className="text-gray-500">Nu participi la niciun eveniment momentan</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Butoane editare */}
                                {editMode && (
                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                                            onClick={() => setEditMode(false)}
                                        >
                                            Anulează
                                        </Button>
                                        <Button
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                                            onClick={handleSave}
                                        >
                                            Salvează modificările
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </LoadingWrapper>
    );
}