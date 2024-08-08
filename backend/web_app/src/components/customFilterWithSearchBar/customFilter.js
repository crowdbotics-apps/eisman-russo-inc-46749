// import React from 'react'
// import SearchInput from '../searchInput/SearchInput';
// import styled from 'styled-components';
// import { Select } from 'antd';

// export default function CustomFilter({
//     searchBar, 
//     filter1, 
//     filter2,
//     resetFilters, 
//     searchBarPlaceholder = "Search...", 
//     filter1Placeholder = "Select", 
//     filter2Placeholder = "Select",
//     resetFiltersText = "Reset Filters",
//     filter1Options = [], 
//     filter2Options = [],
//     onSearchBarBlur = () => {},
//     onFilter1Change = () => {},
//     onFilter2Change = () => {},
//     onResetFiltersClick = () => {},
//     filter1Style = {},
//     filter2Style = {},
//     resetFiltersStyle = {},
// }) {
//   return (
//     <div style={{display:"flex", flexDirection:"row"}}>

//         {searchBar && (
//             <SearchInputWrapper>
//                 <SearchInput onBlur={onSearchBarBlur} placeholder={searchBarPlaceholder} />
//             </SearchInputWrapper>
//         )}
//         {filter1 && (
//             <Select 
//             placeholder={filter1Placeholder} 
//             options={filter1Options}
//             onChange={onFilter1Change} 
//             style={filter1Style}
//             />
//         )}
//         {filter2 && (
//             <Select 
//             placeholder={filter2Placeholder} 
//             options={filter2Options} 
//             onChange={onFilter2Change} 
//             style={filter2Style}
//             />
//         )}
//         {resetFilters && (
//             <div 
//             onClick={onResetFiltersClick}
//             style={resetFiltersStyle}
//             >
//             {resetFiltersText}
//             </div>
//         )}
//     </div>
//   )
// }


// const SearchInputWrapper = styled.div`
// width: 350px;
// margin-left: 20px;
// `;



///////////////////////////



import React, { useState } from 'react';
import SearchInput from '../searchInput/SearchInput';
import styled from 'styled-components';
import { Select } from 'antd';

export default function CustomFilter({
    searchBar, 
    filter1, 
    filter2,
    resetFilters, 
    searchBarPlaceholder = "Search...", 
    filter1Placeholder = "Select", 
    filter2Placeholder = "Select",
    resetFiltersText = "Reset Filters",
    filter1Options = [], 
    filter2Options = [],
    onSearchBarBlur = () => {},
    onFilter1Change = () => {},
    onFilter2Change = () => {},
    onResetFiltersClick = () => {},
    filter1Style = {},
    filter2Style = {},
    resetFiltersStyle = {},
}) {
  const [filter1Value, setFilter1Value] = useState(null);
  const [filter2Value, setFilter2Value] = useState(null);

  const handleResetFilters = () => {
    setFilter1Value(null);
    setFilter2Value(null);
    onResetFiltersClick();
  };

  const handleFilter1Change = (value) => {
    setFilter1Value(value);
    onFilter1Change(value);
  };

  const handleFilter2Change = (value) => {
    setFilter2Value(value);
    onFilter2Change(value);
  };

  return (
    <div style={{display: "flex", flexDirection: "row"}}>

      {searchBar && (
        <SearchInputWrapper>
          <SearchInput onBlur={onSearchBarBlur} onKeyDown={onSearchBarBlur} placeholder={searchBarPlaceholder} />
        </SearchInputWrapper>
      )}
      {filter1 && (
        <Select
          value={filter1Value}
          placeholder={filter1Placeholder}
          options={filter1Options}
          onChange={handleFilter1Change}
          style={filter1Style}
        />
      )}
      {filter2 && (
        <Select
          value={filter2Value}
          placeholder={filter2Placeholder}
          options={filter2Options}
          onChange={handleFilter2Change}
          style={filter2Style}
        />
      )}
      {resetFilters && (
        <div
          onClick={handleResetFilters}
          style={resetFiltersStyle}
        >
          {resetFiltersText}
        </div>
      )}
    </div>
  );
}

const SearchInputWrapper = styled.div`
  width: 350px;
  margin-left: 5px;
`;
