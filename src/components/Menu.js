import {Component} from "react";
import { withTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

class Menu extends Component {
    componentDidMount() {
        this.props.i18n.changeLanguage('ru');
    }

    render() {
        const t = this.props.t;
        return <div id={"menu"}>
            <Link className={"menu-item"} to={"/tea"}>{t('menu-item.tea')}</Link>
            <Link className={"menu-item"} to={"/extras"}>{t('menu-item.extras')}</Link>
            <Link className={"menu-item"} to={"/about"}>{t('menu-item.about')}</Link>
            <Link className={"menu-item"} to={"/contacts"}>{t('menu-item.contacts')}</Link>
        </div>
    }
}

export default withTranslation()(Menu);