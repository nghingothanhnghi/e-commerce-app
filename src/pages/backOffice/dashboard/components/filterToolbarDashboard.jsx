import React, { useState } from 'react';

import DropdownTitle from '../../../../components/DropdownTitle/DropdownTitle';
export default function FilterToolbarDashboard() {
  const dropdownLinks = [
    { to: '/', label: 'Last 7 days' },
    { to: '/', label: 'Today' },
    { to: '/', label: 'Yesterday' },
  ];

  const defaultSelectedItem = dropdownLinks[0]; // Set the default selected item
  return (
    <div className="d-flex justify-content-between">
        <div></div>
        <div className='col-auto align-self-end'>
          <DropdownTitle links={dropdownLinks} defaultSelected={defaultSelectedItem} type='calendar'/>
        </div>
    </div>
  );
}
