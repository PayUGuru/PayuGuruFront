import React from 'react';
import { rem } from '@mantine/core';


function Category({ size, style, selected,...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ width: rem(size), height: rem(size), ...style }} 
        {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={`${selected ? 'bg-primary' : 'bg-secondary'} transition-all`} // Bootstrap classes
      />
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={`${selected ? 'bg-primary' : 'bg-secondary'} transition-all`} // Bootstrap classes
      />
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={`${selected ? 'bg-primary' : 'bg-secondary'} transition-all`} // Bootstrap classes
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={`${selected ? 'bg-primary' : 'bg-warning'} transition-all`} // Bootstrap classes
      />
    </svg>
  );
}

export default Category;
