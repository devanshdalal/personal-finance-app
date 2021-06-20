import React, { useState } from 'react';
import { Button, Form, InputGroup, Input, InputGroupAddon } from 'reactstrap';

const SaveForm = ({ saveHandler }) => {
  const [state, setState] = useState({ name: '', disabled: true }, []);

  const handleChange = (event) => {
    setState({
      disabled: event.target.value ? false : true,
      name: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.name) {
      saveHandler(state.name);
    }
  };

  return (
    <Form>
      <InputGroup className='save-form' size='lg'>
        <Input
          type='text'
          name='Name'
          id='basketName'
          value={state.name}
          onChange={handleChange}
          placeholder='basket name'
        />
        <InputGroupAddon addonType='append'>
          <Button
            onClick={handleSubmit}
            disabled={state.disabled}
            color='primary'
          >
            Save
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

export default SaveForm;
