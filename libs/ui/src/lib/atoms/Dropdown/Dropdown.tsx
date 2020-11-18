import styled from 'styled-components';
import React, { ChangeEvent } from 'react';
import { Dropdown as RBDropdown, Form } from 'react-bootstrap';

const StyledFormControl = styled(Form.Control)`
    &:hover{
      background: #212121;
    }
    &:focus{
      background: #151618;
      border: none;
    }  
`

type DropdownProps = {
  options: string[];
  onSelectHandler: (event: ChangeEvent) => void
};


export const Dropdown: React.FC<DropdownProps> = ({...props}) => {
  return (
    <Form>
    <Form.Group className="my-3" controlId="exampleForm.SelectCustom">
      <Form.Control onChange={props.onSelectHandler} className="bg-secondary text-light" as="select" >
      {
        props.options.map((option) => {
          return (<option key={option}>{option}</option>)
        })
      }
      </Form.Control>
    </Form.Group>
  </Form>
    );
};

// {
//   props.keys.map((key) => {
//   return (<Option>{key.option}</Option>)
//   })
// }