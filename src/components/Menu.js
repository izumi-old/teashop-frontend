import {Component} from "react";
import { withTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

class Menu extends Component {
    render() {
        const t = this.props.t;
        const i18n = this.props.i18n;
        return <div id={"menu"}>
            <Link className={"menu-item"} to={"/tea"}>{t('menu-item.tea')}</Link>
            <Link className={"menu-item"} to={"/extras"}>{t('menu-item.extras')}</Link>
            <Link className={"menu-item"} to={"/about"}>{t('menu-item.about')}</Link>
            <Link className={"menu-item"} to={"/blog"}>{t('menu-item.blog')}</Link>
            <Link className={"menu-item"} to={"/contacts"}>{t('menu-item.contacts')}</Link>
            <button onClick={() => i18n.changeLanguage('ru')}>Ru</button>
            <button onClick={() => i18n.changeLanguage('en-US')}>En</button>
        </div>
    }
}

export default withTranslation()(Menu);