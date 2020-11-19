import styled from 'styled-components';
import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { QueryParamsReverse } from '@internship/shared/types';


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
  selected: string;
  onSelectHandler: (event: ChangeEvent) => void;
};


export const Dropdown: React.FC<DropdownProps> = ({...props}) => {

  console.log((props.selected));
  
  return (
    <Form>
    <Form.Group className="my-3" controlId="exampleForm.SelectCustom">
      <Form.Control onChange={props.onSelectHandler} defaultValue={QueryParamsReverse[props.selected]} className="bg-secondary text-light" as="select" >
      {
        props.options.map((option) => {
          return (<option value={option} key={option}>{option}</option>)
        })
      }
      </Form.Control>
    </Form.Group>
  </Form>
    );
};
