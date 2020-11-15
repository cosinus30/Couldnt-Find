import styled from 'styled-components';
import React from 'react';
import { Dropdown as RBDropdown } from 'react-bootstrap';

const PilledDropdownToggle = styled(RBDropdown.Toggle)`
    background: #151618;
    border-radius: 25px;
    &:hover{
      background: #212121;
    }
    &:focus{
      background: #151618;
      border: none;
    }
      
`

const PilledDropdownMenu = styled(RBDropdown.Menu)`
    background: #151618;
    border-radius: 25px;
`

const PilledDropdownItem = styled(RBDropdown.Item)`
    color: #E9D7DA;
    &:hover{
      background: #212121;
      color: #E9D7DA;
      border-radius: 25px;
    }
`




export const Dropdown = ({...props}) => {
  return (
  <RBDropdown onSelect={props.selected} {...props}>
    <PilledDropdownToggle className="text-light" id="dropdown-basic">
        {props.hello}
    </PilledDropdownToggle>

    <PilledDropdownMenu>
        {/* <PilledDropdownItem >Popular</PilledDropdownItem>
        <PilledDropdownItem >Trending</PilledDropdownItem>
        <PilledDropdownItem >Date</PilledDropdownItem> */}
    </PilledDropdownMenu>
  </RBDropdown>);
};