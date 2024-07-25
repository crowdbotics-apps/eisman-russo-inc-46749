import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Input, Divider, DatePicker } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import SearchInput from '../../components/searchInput/SearchInput';
import HeadingComponent from '../../components/headingComponent/heading';
import { AntdesignTable } from '../../components/antDesignTable/AntdesignTable';
import { ReactComponent as NotesBadge } from "../../assets/rawSvg/notesBadge.svg";
import { ReactComponent as TicketsBadge } from "../../assets/rawSvg/ticketBadge.svg";
import { ReactComponent as UsersBadge } from "../../assets/rawSvg/usersBadge.svg";
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Search } = Input;


const dummyProjectsData = [
  {
    key: '1',
    poNumber: 'PO12345',
    projectName: 'Road Clearing Phase 1',
    eventName: 'Hurricane Relief 2024',
    clientName: 'City of Miami',
    city: 'Miami',
    status: 'Completed',
  },
  {
    key: '2',
    poNumber: 'PO12346',
    projectName: 'Debris Removal',
    eventName: 'Hurricane Relief 2024',
    clientName: 'City of Houston',
    city: 'Houston',
    status: 'Cancelled',
  },
  {
    key: '3',
    poNumber: 'PO12347',
    projectName: 'Road Repair',
    eventName: 'Tornado Response 2024',
    clientName: 'City of Dallas',
    city: 'Dallas',
    status: 'Scheduled',
  },
  {
    key: '4',
    poNumber: 'PO12348',
    projectName: 'Bridge Inspection',
    eventName: 'Flood Recovery 2024',
    clientName: 'City of New Orleans',
    city: 'New Orleans',
    status: 'Unassigned',
  },
  {
    key: '5',
    poNumber: 'PO12349',
    projectName: 'Utility Restoration',
    eventName: 'Earthquake Response 2024',
    clientName: 'City of Los Angeles',
    city: 'Los Angeles',
    status: 'Completed',
  },
];



const projectsColumns = [
  { title: 'PO Number', dataIndex: 'poNumber', key: 'poNumber' },
  { title: 'Project Name', dataIndex: 'projectName', key: 'projectName' },
  { title: 'Event Name', dataIndex: 'eventName', key: 'eventName' },
  { title: 'Client Name', dataIndex: 'clientName', key: 'clientName' },
  { title: 'City', dataIndex: 'city', key: 'city' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: status => {
      let color;
      switch(status) {
        case 'Completed': color = 'green'; break;
        case 'Cancelled': color = 'red'; break;
        case 'unassigned': color = 'orange'; break;
        case 'scheduled': color = 'blue'; break;
        default: color = 'grey';
      }
      return <span style={{ color }}>{status}</span>;
    } 
  },
];

export default function Dashboard() {
  const [totalActiveProjects, setTotalActiveProjects] = useState(280);
  const [totalTickets, setTotalTickets] = useState(1280);
  const [totalUsers, setTotalUsers] = useState(586);
  const [searchText, setSearchText] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const today = dayjs();
  const startDate = today.clone().subtract(5, 'days');
  const endDate = today.clone().add(5, 'days');
  const [dateRange, setDateRange] = useState([startDate, endDate]);
  localStorage.setItem('username', 'Bryan Adams');
  const greetings = `Welcome ${localStorage.getItem('username')}`;
  useEffect(() => {
    fetchService();
  }, []);

  useEffect(() => {
    filterDataByDateRange();
  }, [data, dateRange]);

  const fetchService = async () => {
    try {
     
      setData(dummyProjectsData);

    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const disabledDate = (current) => {
    return current && current > endDate.endOf('day');
  };

  const filterDataByDateRange = () => {
    const [start, end] = dateRange;
    const filteredDataByDate = data.filter(item => {
      const itemDate = dayjs(item.date);
      return itemDate.isAfter(start) && itemDate.isBefore(end);
    });

    setFilteredData(filteredDataByDate);
    // const activeProjects = filteredDataByDate.filter(item => item.status === '');
    // const totalTickets = filteredDataByDate.filter(item => item.status === "");
    // const totalUsers = filteredDataByDate.filter(item => item.status === '');
    setFilteredProjects(filteredDataByDate);
    
    
    // Counts
    setTotalActiveProjects(filteredDataByDate.length);
    
  };

  
  
  const onDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleSearch = (value) => {
    const filteredData = data.filter(project => {
      const matchedProjects = value ? project.projectName.toLowerCase().includes(value.toLowerCase()) : true;
      return matchedProjects;
    });
    setFilteredData(filteredData);
  };
  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ marginBlock: "8px" }}>
        <Heading text={greetings} fontSize='1.4rem'/>
        <Heading text="Here's what happening" color='lightgrey' fontSize='1.1rem'/>
      </div>
    <div style={{ marginBlock: "10px" }}>
     
      <Row gutter={16} style={{ marginBottom: '16px', marginTop: '20px' }}>
        <Col span={6}>
          <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <NotesBadge/>
            <span style={{display: 'flex', flexDirection:"row", justifyContent: 'space-between', marginTop:"8px"}}>
            <Heading text='Active Projects' color='#667085' fontSize='14px'/>
            <Heading text={totalActiveProjects} fontSize='1.45rem'/>
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <TicketsBadge/>
            <span style={{display: 'flex', flexDirection:"row", justifyContent: 'space-between', marginTop:"8px"}}>
            <Heading text='Total Tickets' color='#667085' fontSize='14px'/>
            <Heading text={totalTickets} fontSize='1.45rem'/>
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <UsersBadge/>
            <span style={{display: 'flex', flexDirection:"row", justifyContent: 'space-between', marginTop:"8px"}}>
            <Heading text='No of Users' color='#667085' fontSize='14px'/>
            <Heading text={totalUsers} fontSize='1.45rem'/>
            </span>
          </Card>
        </Col>
      </Row>
    </div>
    <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', padding:"2px" }}>
    <div style={{ marginBlock: "8px" }}>
      <Heading text='Projects' fontSize='1.2rem'/>
    </div>
      <div style={{ marginBottom: '16px' }}>
        <div className="d-flex align-items-center">
          <SearchInputWrapper>
            <SearchInput onChange={(e) => handleSearch(e.target.value)} placeholder="Type to search..." />
          </SearchInputWrapper>
        </div>
      </div>
      <div style={{ marginBottom: '22px', position: 'relative', top: 'auto', bottom: 0 }}>
        <AntdesignTable columns={projectsColumns} data={filteredProjects} allowMultieSelectRows={false} />
      </div>
    </Card>
  </div>
  );
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};

const SearchInputWrapper = styled.div`
  width: 25%;
  margin-left: 10px;
`;
