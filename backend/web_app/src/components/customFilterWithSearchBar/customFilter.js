import React from 'react'
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
  return (
    <div style={{display:"flex", flexDirection:"row"}}>

        {searchBar && (
            <SearchInputWrapper>
                <SearchInput onBlur={onSearchBarBlur} placeholder={searchBarPlaceholder} />
            </SearchInputWrapper>
        )}
        {filter1 && (
            <Select 
            placeholder={filter1Placeholder} 
            options={filter1Options}
            onChange={onFilter1Change} 
            style={filter1Style}
            />
        )}
        {filter2 && (
            <Select 
            placeholder={filter2Placeholder} 
            options={filter2Options} 
            onChange={onFilter2Change} 
            style={filter2Style}
            />
        )}
        {resetFilters && (
            <div 
            onClick={onResetFiltersClick}
            style={resetFiltersStyle}
            >
            {resetFiltersText}
            </div>
        )}
    </div>
  )
}


const SearchInputWrapper = styled.div`
width: 350px;
margin-left: 20px;
`;