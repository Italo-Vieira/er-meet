import { AnimatePresence } from 'framer-motion';
import React, { Component } from 'react';
import { motion } from "framer-motion"

export default class ReduxRouter extends Component {
    render () {
        const {currentPage, routes} = this.props;
        const RoutedComponent = routes(currentPage)
        return (
            <AnimatePresence exitBeforeEnter key={currentPage}>
                <motion.div 
                        exit={{ opacity: 0}}
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}} >
                    <RoutedComponent key={currentPage} ></RoutedComponent>
                </motion.div>
            </AnimatePresence>
        )
    }
}