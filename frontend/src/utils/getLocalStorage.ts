const getLocalStorage = () => {
    const user = localStorage.getItem("usuario");
    if (user) return JSON.parse(user);
    else return null;
};

export default getLocalStorage;