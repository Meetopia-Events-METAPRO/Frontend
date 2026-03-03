export async function getUserInfo(role) {
    let endpoint = "";

    if (role === "user") {
        endpoint = "http://localhost:8080/api/v1/utilizator/me";
    } else if (role === "partner") {
        endpoint = "http://localhost:8080/api/v1/organizator/me";
    } else {
        throw new Error("Rol necunoscut");
    }

    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token lipsă");

    const res = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Eroare la preluarea utilizatorului");
    }

    return await res.json();
}
