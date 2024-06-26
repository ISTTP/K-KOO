import React from 'react'
import useTestStore from "./store/useTestStore";

const Test = () => {
    const { id, setId }= useTestStore();
  
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('click');
      };
    
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
      };
    
      return (
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            placeholder="Enter ID"
            id="nickname"
          />
          <button>Enter</button>
        </form>
      );
}

export default Test;