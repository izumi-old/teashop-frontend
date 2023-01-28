class ExtLocalStorage {
    setAsJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getParsedJson(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export default new ExtLocalStorage();