import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Space, Table, Tag, Pagination } from "antd";
import { ReactComponent as GreaterThanIcon } from "../../assets/rawSvg/greaterThanIcon.svg";
import { ReactComponent as LessThanIcon } from "../../assets/rawSvg/lessThanIcon.svg";
import { RoundedButton, PaginationRightHeading, CustomPaginationContainer } from "./tableStyles";

export const AntdesignTable = ({
  selectedRows,
  tableHeight,
  data = [],
  columns = [],
  paginationRightHeadingName = "Total Results",
  allowMultieSelectRows = true,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(currentPage * pageSize, data.length);

  return (
    <>
      <AntdCustomTable
        className="antd-table-custom"
        columns={columns}
        dataSource={data?.slice(startIndex, endIndex)}
        style={{ height: tableHeight }}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        {...(allowMultieSelectRows
          ? {
              rowSelection: {
                type: "checkbox",
                ...rowSelection,
              },
            }
          : {})}
        pagination={false}
        {...props}
      />
      <CustomPaginationContainer>
        <div className="pl-4 pr-4">
          <PaginationRightHeading>
            {paginationRightHeadingName} ({data.length})
          </PaginationRightHeading>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline" }}>
          <PaginationRightHeading>
            {startIndex}-{endIndex} of {data.length} results
          </PaginationRightHeading>
          <RoundedButton onClick={handlePrevPage} disabled={currentPage === 1}>
            <LessThanIcon />
          </RoundedButton>

          <RoundedButton onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / pageSize)} margin="0px 12px">
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
