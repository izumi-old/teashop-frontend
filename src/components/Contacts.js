import "../styles/components/Contacts.css";
function Contacts() {
    return (
        <div id={"contacts-container"}>
            <div id={"contacts-header"}>
                <h1>Контакты</h1>
            </div>
            <div id={"contacts-body"}>
                <div className={"body-item"} id={"our-stores"}>

                    <h3 className={"item-header"}>Наши магазины</h3>

                    <div className={"text-body"}>
                        <p>171946, Владимирская область, город Одинцово, бульвар Будапештсткая, 85</p>
                        <p>526650, Калининградская область, город Ступино, пл. Ломоносова, 22</p>
                        <p>666748, Самарская область, город Балашиха, пер. Домодедовская, 38</p>
                    </div>

                </div>
                <div className={"body-item"} id={"timetable"}>

                    <h3 className={"item-header"}>График работы</h3>

                    <div className={"text-body"}>
                        <p>Пн-Пт: 8:00-20:00</p>
                        <p>Сб-Вс: 9:00-18:00</p>
                    </div>

                </div>
                <div className={"body-item"} id={"hotline"}>

                    <h3 className={"item-header"}>Горячая линия</h3>

                    <div className={"text-body"}>
                        <p>Тел.: +7(123)456-78-90</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contacts;
