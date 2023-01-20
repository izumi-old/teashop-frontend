class SearchCondition {
    constructor(property: String, operator: String, value: any) {
        this.property = property;
        this.operator = operator;
        this.value = value;
    }
}

export default SearchCondition;