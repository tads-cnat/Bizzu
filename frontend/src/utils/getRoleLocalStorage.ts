const getRoleLocalStorage = () => {
    const role = localStorage.getItem("role");
    if (role) return JSON.parse(role);
    else return null;
};

export default getRoleLocalStorage;