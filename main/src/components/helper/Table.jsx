import React from 'react';
import { Table } from 'reactstrap';

const Example = ({ elements = [], deleteElement }) => {
  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          {/* <th>#</th> */}
          <th>Mutual Fund</th>
          <th style={{ width: '20%' }}>Weight</th>
          <th style={{ width: '10%' }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {elements.map((user, key) => {
          return (
            <tr key={key}>
              <td>{user.name}</td>
              <td>{user.wt}</td>
              <td>
                <button className='icon' onClick={() => deleteElement(key)}>
                  <i className='fas fa-minus' />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Example;
