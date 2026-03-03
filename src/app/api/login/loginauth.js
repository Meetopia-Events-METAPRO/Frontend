export async function login({ email, password, role }) {
    const endpoint = role === "user" ? "/api/v1/utilizator/auth/login" : "/api/v1/organizator/auth/login";

    const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Eroare la autentificare");
    }

    const data = await response.json();
    return data;
}
