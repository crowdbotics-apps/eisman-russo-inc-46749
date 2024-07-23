import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "antd";
import { ReactComponent as GreaterThanIcon } from "../../assets/rawSvgs/greaterThanIcon.svg";
import { ReactComponent as LessThanIcon } from "../../assets/rawSvgs/lessThanIcon.svg";
import { RoundedButton, PaginationRightHeading, CustomPaginationContainer } from "./tableStyles";

export const AntdesignTablePagination = ({
  selectedRows,
  tableHeight,
  data = [],
  columns = [],
  paginationRightHeadingName = "Total Results",
  totalCount = 0,
  loadPaginatedData,
  pageSize = 10,
  allowRowSelection = true,
  currentPageProp,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = useCallback((rowKeys, SelctRows) => {
    selectedRows({ rowKeys, SelctRows });
  }, []);

  const getCheckboxProps = useCallback(
    (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
    [],
  );

  const rowSelection = {
    onChange,
    getCheckboxProps,
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      loadPaginatedData(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalCount / pageSize)) {
      setCurrentPage(currentPage + 1);
      loadPaginatedData(currentPage + 1);
    }
  };

  let startIndex = 0;
  if (totalCount > 0) {
    startIndex = (currentPage - 1) * pageSize + 1;
  }
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  return (
    <>
      <AntdCustomTable
        className="antd-table-custom"
        columns={columns}
        dataSource={data}
        style={{ height: tableHeight }}
        rowSelection={
          allowRowSelection
            ? {
                type: "checkbox",
                ...rowSelection,
              }
            : null
        }
        pagination={false}
        {...props}
      />
      <CustomPaginationContainer>
        <div className="pl-4 pr-4">
          <PaginationRightHeading>
            {paginationRightHeadingName} ({totalCount})
          </PaginationRightHeading>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline" }}>
          <PaginationRightHeading>
            {startIndex}-{endIndex} of {totalCount} results
          </PaginationRightHeading>
          <RoundedButton onClick={handlePrevPage} disabled={currentPage === 1}>
            <LessThanIcon />
          </RoundedButton>

          <RoundedButton onClick={handleNextPage} disabled={currentPage >= Math.ceil(totalCount / pageSize)} margin="0px 12px">
            <GreaterThanIcon />
          </RoundedButton>
        </div>
      </CustomPaginationContainer>
    </>
  );
};

const AntdCustomTable = styled(Table)`
  &.antd-table-custom .ant-table-thead .ant-table-cell {
    background-color: #f5f5f5;
  }
`;
