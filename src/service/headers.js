export default function authHeader() {
    const token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}