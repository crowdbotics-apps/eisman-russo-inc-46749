import React from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/icons/SearchIcon";

function SearchInput({
  containerBorder,
  search,
  onChange = () => null,
  onBlur = () => null,
  placeholder = "Search...",
  ...props
}) {
  return (
    <SearchBar>
      <SearchContainer containerBorder={containerBorder}>
        <LogoSearch>{SearchIcon}</LogoSearch>
        {/* <Search
          placeholder="Search..."
          value={search}
          onChange={e => onChange(e.target.value)}
        /> */}
        <Input placeholder={placeholder} value={search} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} {...props} />
      </SearchContainer>
    </SearchBar>
  );
}

const Input = styled.input`
  width: ${(props) => props?.width || "100%"};
  height: ${(props) => (props?.height ? props?.height : "40px")};
  border: ${(props) => props.border ?? "1px solid rgb(214, 217, 225)"};
  border-radius: 8px;
  margin: ${(props) => props?.margin ?? "0"};
  padding: 12px 10px 8px 37px;
  box-sizing: border-box;
  outline: none;
  font-family:
    Helvetica Neue,
    Arial;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 57px;
  color: #000;
  ::placeholder {
    padding: 10px 0px; /* Adjust placeholder padding */
    color: #bdbdbd;
  }
`;

const SearchBar = styled.div`
  height: 64px;
  border-radius: 4px;
  padding: 12px 0px 12px 0px;
  box-sizing: border-box;
`;
const SearchContainer = styled.div`
  height: 100%;
  border-radius: 8px;
  border: ${(props) => props?.containerBorder ?? "1px solid #e4eaf0"};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const LogoSearch = styled.svg`
  height: 24px;
  width: 24px;
  margin-left: 8px;
  object-fit: contain;
  fill: transparent;
  position: absolute;
`;

const Search = styled.input`
  width: 100%;
  object-fit: contain;
  border: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  padding-left: 40px;

  &:focus {
    border: none;
    outline: none;
  }
`;

export default SearchInput;
