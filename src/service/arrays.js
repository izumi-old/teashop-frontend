class Arrays {
    static remove(array: Array, item: *) {
        let index = array.indexOf(item);
        array.splice(index, 1);
    }

    static clear(array: Array) {
        array.splice(0, array.length);
    }
}

export default Arrays;