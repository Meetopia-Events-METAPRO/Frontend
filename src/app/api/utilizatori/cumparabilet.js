export const cumparaBilet = async (evenimentId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token lipsă. Trebuie să te autentifici.");

        const response = await fetch(`http://localhost:8080/api/v1/utilizator/eveniment/${evenimentId}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || `Eroare la cumpărarea biletului (cod ${response.status})`);
        }

        return "Ai cumparat biletul cu succes!";
    } catch (error) {
        console.error("Eroare la cumpărare bilet:", error);
        throw error;
    }
};
