import React from 'react';
import { useEffect } from 'react';

const DynamicTitle = (props) => {
    const { pageTitle } = props
    useEffect(() => {
        document.title = "E-Bhuktan : " + pageTitle;
    }, [pageTitle]);
};

export default DynamicTitle;