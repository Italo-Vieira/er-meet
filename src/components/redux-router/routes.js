import ConferencePage from "../conference-page/";
import LoginPage from "../login-page";
import PreJoinPage from "../pre-join";
import LoadingPage from '../loading-page'

const routesArray = {
    "conference": ConferencePage,
    "login": LoginPage,
    "preJoin": PreJoinPage,
    "loading": LoadingPage,
};

export function routes(page) {
    return routesArray[page];
};