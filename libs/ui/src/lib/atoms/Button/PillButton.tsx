
import styled from 'styled-components';
import React from 'react';
import { Button as RBButton } from 'react-bootstrap';

const PilledButton = styled(RBButton)`
    background: #C4C4C4;
    border-radius: 25px;
`


export const PillButton = ({children, ...props}) => {
  return <PilledButton variant="primary" {...props}>{children}</PilledButton>;
};