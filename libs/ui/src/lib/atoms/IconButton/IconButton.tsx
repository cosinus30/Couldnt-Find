import React from 'react';
import { Button as RBButton } from 'react-bootstrap';

export const IconButton = ({ children, ...props }) => {
    return <RBButton variant="none" className="float-right" {...props}>{children}</RBButton>;
};
