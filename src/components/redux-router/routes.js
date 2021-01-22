import ConferencePage from "../conference-page/";
import LoginPage from "../login-page";
import PreJoinPage from "../pre-join";

const routesArray = {
    "conference": ConferencePage,
    "login": LoginPage,
    "preJoin": PreJoinPage
};

export function routes(page) {
    return routesArray[page];
};