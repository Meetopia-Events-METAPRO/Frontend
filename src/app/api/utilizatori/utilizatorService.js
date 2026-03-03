export const fetchUtilizatori = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error('Trebuie să fii logat pentru a vedea utilizatorii.');
        }
        const response = await fetch('http://localhost:8080/api/v1/utilizator',{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });


        if (!response.ok) {
            throw new Error(`Eroare la încărcarea Utilizatorilor: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Eroare la fetchUser:', error);
        throw error;
    }
};