export const getEvenimenteUtilizator = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token lipsă");
        const response = await fetch('http://localhost:8080/api/v1/utilizator/evenimente',{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Eroare la încărcarea evenimentelor: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Eroare la preluarea evenimentelor:', error);
        throw error;
    }
};