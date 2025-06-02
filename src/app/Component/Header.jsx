import React from 'react';
import { fetchHeaderData } from '../api/dynamicData,';
import HeaderProvider from './HeaderProvider/HeaderProvider';
import { fetchDepartments } from '../api/department';

const Header = async() => {
  const header = await fetchHeaderData({ cache: "no-store" });
  console.log("Header data:", header);
  const departments = await fetchDepartments()
  return (
    <div>
      <HeaderProvider header={header} departments={departments}/>
    </div>
  );
};

export default Header;