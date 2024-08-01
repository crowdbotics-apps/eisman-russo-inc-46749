import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

export default function PaginatedSelect({fetchData, placeholder = "Select", options, onChange, style}) {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchData(page);
      }, [page]);

    const handlePopupScroll = (event) => {
        const { target } = event;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      };

      
  return (
    <Select
    placeholder={placeholder}
    options={options}
    onChange={onChange}
    style={style}
    onPopupScroll={handlePopupScroll}
    notFoundContent={loading ? <Spin size="small" /> : null}
  />
  );
}
