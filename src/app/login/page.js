"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/login/loginauth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {LoadingWrapper} from "@/components/LoadingWrapper";
import { getUserInfo } from "@/app/api/utilizatori/getUserInfo";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState(null);

    const router = useRouter();

    const { mutate, isLoading, isError } = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            console.log("Login success, data:", data);
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userRole", role);
            try {
                const userInfo = await getUserInfo(role);
                userInfo.userRole === 'ADMIN' && localStorage.setItem("adminrole", userInfo.userRole);
                localStorage.setItem("userEmail", userInfo.email);
            } catch (err) {
                console.error("Eroare la preluarea numelui:", err);
            }
            router.push("/");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        },
        onError: (error) => {
            console.log("Login error:", error);
            setError(error.message || "Eroare la autentificare");
        },

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        mutate({ email, password, role });
    };
    return (
        <main className="min-h-screen bg-gray-100 text-black flex flex-col">
            <section className="flex flex-col items-center justify-center px-6 py-24">
                <div className="w-full max-w-md text-center mb-12">
                    <h2 className="text-5xl font-bold mb-4">Autentificare</h2>
                    <p className="text-lg text-gray-600">
                        Introdu emailul și parola pentru a accesa contul tău.
                    </p>
                </div>

                <LoadingWrapper isLoading={isLoading} isError={isError} error={error} data={!isLoading}>
                    <form className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 space-y-6 border" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input
                                type="email"
                                placeholder="email@exemplu.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Parolă</label>
                            <Input
                                type="password"
                                placeholder="Parola ta"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="w-full cursor-pointer">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="user" className="cursor-pointer">Utilizator Normal</SelectItem>
                                        <SelectItem value="partner" className="cursor-pointer">Organizator</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button className="w-full mt-3 text-base font-medium py-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition-all">Conectează-te</Button>
                    </form>
                </LoadingWrapper>
            </section>
        </main>
    );
}

export default Login;
