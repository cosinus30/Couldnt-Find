import React from 'react';
import { Spinner as RBSpinner } from 'react-bootstrap';

export const Spinner = ({...props }) => {
    return <RBSpinner animation="grow" variant="primary" className="my-auto" {...props}></RBSpinner>;
};
