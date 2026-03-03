export const deleteUtilizator = async (id) => {
    const res = await fetch(`http://localhost:8080/api/v1/utilizator/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    if (!res.ok) {
        throw new Error('Eroare la ștergerea utilizatorului');
    }
};