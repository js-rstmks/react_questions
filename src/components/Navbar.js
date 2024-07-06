import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFilePen, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAuth }) => {
    return (
        <nav>
            <Link to="/">
                <FontAwesomeIcon icon={faHouse} />
                ホーム
            </Link>
            {!isAuth ? (
                <Link to="/login">
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    ログイン
                </Link>) : (
                <>
                    <Link to="/logout">
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                        ログアウト
                    </Link>
                    <Link to="/createcategory">カテゴリ作成</Link>
                    <Link to="/set-problem">問題を出題する</Link>
                </>
            )}
        </nav>
    )
}

export default Navbar