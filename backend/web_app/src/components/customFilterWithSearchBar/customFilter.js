
import React, { useState } from 'react';
import SearchInput from '../searchInput/SearchInput';
import styled from 'styled-components';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';


export default function CustomFilter({
    searchBar, 
    filter1, 
    filter2,
    dateFilter,
    resetFilters, 
    searchBarPlaceholder = "Search...", 
    filter1Placeholder = "Select", 
    filter2Placeholder = "Select",
    dateFilterPlaceholder = "Select Date",
    resetFiltersText = "Reset Filters",
    filter1Options = [], 
    filter2Options = [],
    onSearchBarBlur = () => {},
    onFilter1Change = () => {},
    onFilter2Change = () => {},
    onDateFilterChange = () => {},
    onResetFiltersClick = () => {},
    filter1Style = {},
    filter2Style = {},
    dateFilterStyle = {},
    resetFiltersStyle = {},
}) {
  const [filter1Value, setFilter1Value] = useState(null);
  const [filter2Value, setFilter2Value] = useState(null);
  const [dateFilterValue, setDateFilterValue] = useState(null);

  const handleResetFilters = () => {
    setFilter1Value(null);
    setFilter2Value(null);
    setDateFilterValue(null);
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

  const handleDateFilterChange = (value) => {
    setDateFilterValue(value);
    const formattedValue = value ? dayjs(value).format("YYYY-MM-DD") : null;
    onDateFilterChange(formattedValue);
  }

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
      {dateFilter && (
        <DatePicker 
          value={dateFilterValue}
          placeholder={dateFilterPlaceholder}
          onChange={handleDateFilterChange}
          style={dateFilterStyle}
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
