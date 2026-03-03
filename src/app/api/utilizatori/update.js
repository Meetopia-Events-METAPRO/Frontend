export const updateUtilizator = async ({ id, data }) => {
    const params = new URLSearchParams(data).toString();

    const res = await fetch(`http://localhost:8080/api/v1/utilizator/${id}?${params}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });

    if (!res.ok) {
        throw new Error('Eroare la actualizarea utilizatorului');
    }
};
