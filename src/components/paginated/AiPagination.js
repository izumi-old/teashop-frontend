import React, {Component} from 'react';
import {Container, Pagination} from "react-bootstrap";
import {sortById} from "../../service/utils";
import logger from "../../utils/Logger";
import PaginationResponse from "../../entity/PaginationResponse";

class AiPagination extends Component {
    constructor(props) {
        super(props);

        this.itemsPageSize = props.itemsPageSize
        this.state = {
            currentPageNumber: 1,
            totalPages: 0,
            totalItems: 0,
            items: [],
            pages: []
        };

        this.changePage = this.changePage.bind(this);
        this.renderingContainer = this.renderingContainer.bind(this);
        this.deleteByIdAndRerender = this.deleteByIdAndRerender.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.updateItemAndRerender = this.updateItemAndRerender.bind(this);
        this.getSortedItems = this.getSortedItems.bind(this);
        this.findItemIndex = this.findItemIndex.bind(this);
        this.addItemIfAbsent = this.addItemIfAbsent.bind(this);
        this.gettingFunction = this.gettingFunction.bind(this);
        this.getItemsPageSize = this.getItemsPageSize.bind(this);
        this.renderControl = this.renderControl.bind(this);
    }

    renderingContainer(items) {
        throw new Error("Rendering container function have to be overridden");
    }

    componentDidMount() {
        if (!this.itemsPageSize) {
            this.itemsPageSize = this.getItemsPageSize();
        }

        this.changePage(1);
    }

    gettingFunction(page, size): Promise<PaginationResponse> {
        throw new Error("Getting function have to be overridden");
    }

    getItemsPageSize(): Number {
        return 4;
    }

    findItemIndex(id) {
        let index = -1;
        let items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    deleteById(id) {
        logger.debug("Deleting an item by id. Id: " + id + "\nitems:" + JSON.stringify(this.state.items));
        let index = this.findItemIndex(id);
        let items = this.state.items;
        if (index === -1) {
            logger.debug("No one item with such id wasn't found");
            return false;
        }
        items.splice(index, 1);
        logger.debug("An item with such id was found and removed. Items: " + JSON.stringify(items));
        return true;
    }

    deleteByIdAndRerender(id) {
        let deleted = this.deleteById(id);
        if (deleted) {
            logger.debug("Re-rendering");
            this.setState({
                items: this.state.items
            });
        }
        return deleted;
    }

    updateItemAndRerender(item) {
        logger.debug("Updating items. First step - delete old one entity by id");
        let deleted = this.deleteByIdAndRerender(item.id);
        if (deleted) {
            let items = this.state.items;
            items.push(item);
            logger.debug("Updating items. Next step - add the new item and re-render");
            this.setState({
                items: items
            });
        } else if (!deleted) {
            logger.debug("Cancel updating, it wasn't found any fit item");
        }
    }

    addItemIfAbsent(item) {
        logger.debug("Adding an item. Checking is the item already in items. Item: " + JSON.stringify(item));
        let index = this.findItemIndex(item.id);
        if (index !== -1) {
            console.log("The item is in items. Canceling");
            return;
        }

        let items = this.state.items;
        items.push(item);
        logger.debug("The item wasn't found and was added. Re-rendering");
        this.setState({
            items: items
        });
    }

    changePage(pageNumber) {
        logger.debug("\n====\nChanging page, page number: " + pageNumber);
        this.gettingFunction(pageNumber - 1, this.itemsPageSize).then(response => {
            logger.debug("Got a response");

            let pages = [];
            for (let i = 1; i < response.totalPages+1; i++) {
                pages.push(i);
            }
            this.setState({
                totalPages: response.totalPages,
                totalItems: response.totalElements,
                currentPageNumber: pageNumber,
                items: response.content,
                pages: pages
            });

            logger.debug("Page changing ended successful, current state: " + JSON.stringify(this.state) + "\n====");
        })
    }

    getSortedItems() {
        let items = this.state.items;
        items.sort(sortById);
        return items;
    }

    /*
    return (
    <>
      { isGoal ? <MadeGoal/> : <MissedGoal/> }
    </>
    );
     */

    withNextAndPrevious() { //TODO: register in constructor
    }

    withoutNextAndPrevious() { //TODO: register in constructor
        return (
            <Container>
                <Pagination className={"d-flex justify-content-center"}>
                    <Pagination.First onClick={() => this.changePage(1)}
                                      disabled={this.state.currentPageNumber === 1}/>
                    <Pagination.Prev onClick={() => this.changePage(this.state.currentPageNumber - 1)}
                                     disabled={this.state.currentPageNumber === 1}/>

                    { this.state.currentPageNumber >= 4 &&
                        <div></div>
                    }
                    {this.state.pages.map(page =>
                        <Pagination.Item key={page}
                                         onClick={() => this.changePage(page)}
                                         active={page === this.state.currentPageNumber}
                                         activeLabel={""}>
                            {page}
                        </Pagination.Item>)
                    }

                    <Pagination.Next onClick={() => this.changePage(this.state.currentPageNumber + 1)}
                                     disabled={this.state.currentPageNumber === this.state.totalPages}/>
                    <Pagination.Last onClick={() => this.changePage(this.state.totalPages)}
                                     disabled={this.state.currentPageNumber === this.state.totalPages}/>
                </Pagination>

                {this.renderingContainer(this.getSortedItems())}
            </Container>
        );
    }

    withLeftDots() { //TODO: register in constructor

    }

    withoutLeftDots() { //TODO: register in constructor

    }

    withRightDots() { //TODO: register in constructor
    }

    withoutRightDots() { //TODO: register in constructor
    }

    renderControl() {
        let totalPages = Number(this.state.totalPages);
        if (totalPages <= 1) {
            return (
                <Container>
                    <Pagination className={"d-flex justify-content-center"}>
                        <Pagination.First onClick={() => this.changePage(1)}
                                          disabled={this.state.currentPageNumber === 1}/>

                        {this.state.pages.map(page =>
                            <Pagination.Item key={page}
                                             onClick={() => this.changePage(page)}
                                             active={page === this.state.currentPageNumber}
                                             activeLabel={""}>
                                {page}
                            </Pagination.Item>)
                        }

                        <Pagination.Last onClick={() => this.changePage(this.state.totalPages)}
                                         disabled={this.state.currentPageNumber === this.state.totalPages}/>
                    </Pagination>

                </Container>
            );
        } else {
            return (
                <Container>
                    <Pagination className={"d-flex justify-content-center"}>
                        <Pagination.First onClick={() => this.changePage(1)}
                                          disabled={this.state.currentPageNumber === 1}/>
                        <Pagination.Prev onClick={() => this.changePage(this.state.currentPageNumber - 1)}
                                         disabled={this.state.currentPageNumber === 1}/>

                        {this.state.pages.map(page =>
                            <Pagination.Item key={page}
                                             onClick={() => this.changePage(page)}
                                             active={page === this.state.currentPageNumber}
                                             activeLabel={""}>
                                {page}
                            </Pagination.Item>)
                        }

                        <Pagination.Next onClick={() => this.changePage(this.state.currentPageNumber + 1)}
                                         disabled={this.state.currentPageNumber === this.state.totalPages}/>
                        <Pagination.Last onClick={() => this.changePage(this.state.totalPages)}
                                         disabled={this.state.currentPageNumber === this.state.totalPages}/>
                    </Pagination>

                </Container>
            );
        }
    }

    render() {
        return this.renderControl()
    }
}

export default AiPagination;