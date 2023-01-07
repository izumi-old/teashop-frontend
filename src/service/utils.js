export const sortById = (a, b) => {return a.id >= b.id ? 1 : -1};

/**
 * @param array - Source
 * @param from - Index, including
 * @param until - Index, excluding
 * @return An array contains elements between from and until in the source array.
 */
export function subarray(array, from, until) {
    let subarray = [];
    for (let i = from; i < until; i++) {
        subarray.push(array[i]);
    }

    return subarray;
}
