import React from 'react'
import ConferencePage from "../conference-page/";
import LoginPage from "../login-page";

const routesArray = {
    "conference": ConferencePage,
    "login": LoginPage
};

export function routes(page) {
    return routesArray[page];
};