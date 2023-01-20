import SearchCondition from "./SearchCondition";

class SearchFilter {
    constructor(conditions: Array<SearchCondition>) {
        this.conditions = conditions;
    }
}

export default SearchFilter;