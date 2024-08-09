import React, { useEffect, useState } from 'react'
import { Card, Segmented } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../headingComponent/heading';
import { pushNotification } from '../../util/notification';
import CustomButton from '../customButton/customButton';
import { main_api } from '../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../constants/apiEndPoints';
import { AntdesignTablePagination } from '../antDesignTable/AntdesignTablePagination';
import { hazardNameColumns, hazardTypeColumns } from '../../util/antdTableColumns';
import CustomFilter from '../customFilterWithSearchBar/customFilter';
import { status } from '../../util/dropdownData';
import UpdateHazardName from '../modals/administration/hazard/updateHazardName';
import UpdateHazardType from '../modals/administration/hazard/updateHazardType';
import useHazard from '../hooks/useHazard';

export default function Hazard() {

  //----------------------- Custom Hooks -----------------------//

  const { hazardTypes, hazardNames, hazardTypesOptions, fetchHazardTypes, fetchHazardNames, handleAddHazardType, handleEditHazardType, handleAddHazardName, handleEditHazardName } = useHazard();


  //----------------------- State Management -----------------------//

  const [data, setData] = useState([]);
  const [selectTab, setSelectTab] = useState("Hazard Name");

  const [searchedValue, setSearchedValue] = useState('');
  const [statusSelected, setStatusSelected] = useState(null);
  const [typeSelected, setTypeSelected] = useState(null);

  const [editHazardValues, setEditHazardValues] = useState(null);
  const [updateHazardNameModal, setUpdateHazardNameModal] = useState(false);
  const [updateHazardTypeModal, setUpdateHazardTypeModal] = useState(false);

  const [count, setCount] = useState(0);


  //----------------------- Fetch Data -----------------------//

  const fetchData = async (query = '',page = 1) => {
    let url = ``;
    if (selectTab === "Hazard Name") {
      url = `${adminAPIsEndPoints.LIST_HAZARD_NAME(query)}&page=${page}`;
    } else if (selectTab === "Hazard Type") {
      url = `${adminAPIsEndPoints.LIST_HAZARD_TYPE(query)}&page=${page}`;
    }
    main_api.get(url)
    .then((response) => {
      setCount(response.data.count);
      const result = response.data.results;
      setData(result);
    }).catch((error) => {
      pushNotification(error.response.data.detail, "error");
    });
  };
    



  //----------------------- Use Effect -----------------------//

  useEffect(() => {
    fetchData();
  }, [selectTab]);

    //----------------------- Filter -----------------------//

  useEffect(() => {
    let query = `search=${searchedValue}`;
    if (statusSelected!==null) {
      query+=`&is_active=${statusSelected}`;
    }
    if (selectTab === "Hazard Name" && typeSelected) {
      query = `type=${typeSelected}`;
    }
    fetchData(query);
  }, [statusSelected, searchedValue]);


  //----------------------- Handle Add and Edit Modal -----------------------//

  const handleEditRow = (values) => {
    if (values) {
      setEditHazardValues(values);
      selectTab === "Hazard Name" ? setUpdateHazardNameModal(true) : setUpdateHazardTypeModal(true);
    }
  };

  const handleAddRow = () => { 
    setEditHazardValues(null);
    selectTab === "Hazard Name" ? setUpdateHazardNameModal(true) : setUpdateHazardTypeModal(true);
  };


  //------------------ Functions to Handle Add and Edit Hazard ---------------------//
  
  const handleEditHazard = async (values) => {
    const id = editHazardValues.id;
    selectTab === "Hazard Name" ? handleEditHazardName(id,values,setUpdateHazardNameModal) : handleEditHazardType(id,values,setUpdateHazardTypeModal);
  };

  const handleAddHazard = async (values) => {
    selectTab === "Hazard Name" ? handleAddHazardName(values,setUpdateHazardNameModal) : handleAddHazardType(values,setUpdateHazardTypeModal);
  };

  return (
    <>
    
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage Hazard" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={selectTab === "Hazard Name" ? "Add Hazard Name" : "Add Hazard Type"} color={"white"} onClick={handleAddRow} />
        </div>
        <Segmented
          options={["Hazard Name", "Hazard Type"]}
          onChange={(e) => {
            setSelectTab(e);
          }}
          defaultValue={selectTab}
          size="large"
          className="ms-2 p-1"
        />
        {selectTab === "Hazard Name" ? 
          (
            <>
                <CustomFilter 
                  searchBar={true}
                  filter1={true}
                  filter2={true}
                  resetFilters={true}
                  searchBarPlaceholder={"Search by Hazard Name..."}
                  filter1Placeholder={"Hazard Type"}
                  filter2Placeholder={"Status"}
                  resetFiltersText='Reset Filter'
                  filter1Options={hazardTypesOptions}
                  filter2Options={status}
                  onSearchBarBlur={(e) => setSearchedValue(e)}
                  onFilter1Change={(e) => setTypeSelected(e)}
                  onFilter2Change={(e) => setStatusSelected(e)}
                  onResetFiltersClick={() => {
                    setSearchedValue('');
                    setStatusSelected(null);
                    setTypeSelected(null);
                    fetchData();
                  }}
                  filter1Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
                  filter2Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
                  resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
                />
                <AntdesignTablePagination 
                  columns={hazardNameColumns({handleEditRow})} 
                  data={hazardNames?.data?.results}
                  totalCount={hazardNames?.data?.count}
                  loadPaginatedData={fetchHazardNames} 
                  allowRowSelection={false}
                  tableHeight={500}
                  tableWidth={1200} 
                />
            </>
          )
          : 
          (
            <>
            
              <CustomFilter 
                searchBar={true}
                filter1={true}
                resetFilters={true}
                searchBarPlaceholder={"Search by Hazard Type..."}
                filter1Placeholder={"Status"}
                resetFiltersText='Reset Filter'
                filter1Options={status}
                onSearchBarBlur={(e) => setSearchedValue(e)}
                onFilter1Change={(e) => setStatusSelected(e)}
                onResetFiltersClick={() => {
                  setSearchedValue('');
                  setStatusSelected(null);
                  fetchData();
                }}
                filter1Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
                resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
              />
              <AntdesignTablePagination 
                columns={hazardTypeColumns({handleEditRow})} 
                data={hazardTypes?.data?.results}
                totalCount={hazardTypes?.data?.count}
                loadPaginatedData={fetchHazardTypes} 
                allowRowSelection={false}
                tableHeight={500}
                tableWidth={1200} 
              />
            </>
          )
        }
    </CustomCard>

    {updateHazardNameModal && (
      <UpdateHazardName
        isModalOpen={updateHazardNameModal}
        title={editHazardValues ? 'Edit Hazard Name' : 'Add Hazard Name'}
        onFinish={editHazardValues ? handleEditHazard : handleAddHazard}
        setModalOpen={setUpdateHazardNameModal}
        editHazardValues={editHazardValues}  
      />
    )}

    {updateHazardTypeModal && (
      <UpdateHazardType
        isModalOpen={updateHazardTypeModal}
        title={editHazardValues ? 'Edit Hazard Type' : 'Add Hazard Type'}
        onFinish={editHazardValues ? handleEditHazard : handleAddHazard}
        setModalOpen={setUpdateHazardTypeModal}
        editHazardValues={editHazardValues}  
      />
    )}

    </>
  )
}



const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};


const CustomCard = styled(Card)`
  width: calc(100vw - 40px);
  max-width: 1270px;
  height: calc(100vh - 40px);
  max-height: 720px;
  margin: 20px;
  background-color: white;
  
  @media (max-width: 768px) {
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    margin: 10px;
  }
`;