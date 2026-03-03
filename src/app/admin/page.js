'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminPanel() {
    const router = useRouter();

    const sections = [
        {
            title: 'Manage Users',
            description: 'View, edit, or remove users from the platform.',
            href: '/admin/users',
        },
        {
            title: 'Manage Partners',
            description: 'Edit or remove event partners.',
            href: '/admin/partners',
        },
        {
            title: 'Manage Events',
            description: 'Review and manage submitted events.',
            href: '/admin/events',
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">Admin Panel</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sections.map(({ title, description, href }) => (
                        <Card key={title} className="rounded-2xl shadow hover:shadow-lg transition hover:scale-105">
                            <CardContent className="p-6 flex flex-col h-full justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{description}</p>
                                </div>
                                <Button className= "cursor-pointer" onClick={() => router.push(href)}>Go to {title}</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
