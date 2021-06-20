import Select from 'react-select';
import React, { useSelector } from 'react-redux';
import { useEffect } from 'react';

const FundInput = ({ weightRef, nameRef, currentRow, onChange, onSubmit }) => {
  const fundNamesSuggestions = useSelector((state) => {
    const f = state.funds;
    // console.log(f);
    return Object.keys(f).map((key, index) => {
      return { value: key, label: key };
    });
  });

  // console.log('fundNames', fundNamesSuggestions);
  return (
    <div className='input-form'>
      <Select
        className='selector-geography'
        defaultValue={{ label: 'India', value: 'India' }}
        // isClearable={true}
        isSearchable={true}
        name='geography'
        // value={currentRow.name}
        options={[{ label: 'India', value: 'India' }]}
      />
      <Select
        className='selector-name'
        defaultValue={''}
        isClearable={true}
        isSearchable={true}
        onChange={onChange}
        ref={nameRef}
        name='color'
        // value={currentRow.name}
        options={fundNamesSuggestions}
      />
      <input
        type='number'
        className='selector-weight'
        name={'weight'}
        id='weight'
        placeholder='wt > 0.0'
        min={0.001}
        step={0.00001}
        required
        onChange={onChange}
        ref={weightRef}
      />
      <button
        type='submit'
        className='add-button'
        value='Submit'
        onClick={onSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default FundInput;
