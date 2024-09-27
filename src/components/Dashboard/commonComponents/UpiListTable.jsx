/* eslint-disable react-hooks/exhaustive-deps */
// UpiListTable.js
import React, { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useTable, useSortBy } from 'react-table';
import { ENDPOINTS } from '../../../utils/apiConfig';
import DateRangeToolBar from '../PageToolbar';
import Panel from 'rsuite/Panel';
import { Button } from "@mui/material";
import { HStack, Stack, Text, Toggle } from "rsuite";
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import 'rsuite/Toggle/styles/index.css';
import 'rsuite/Stack/styles/index.css';
import 'rsuite/Panel/styles/index.css';
import CustomButtonGroup from './TableIconButtons';
import CopyButtonIcon from './CopyButtonIcon';
import QRCodeButton from './QRCodeIcon';
import UpiModal from './UpiModel';

const UpiListTable = ({ data, toggleStatus , onSort, sortBy, sortDirection  }) => {

  const [search, setSearch] = useState('');
  const [filteredDatacheck, setFilteredDatacheck] = useState(data);
  const [upiList, setUPList] = useState([]);
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);
  const [resetPassErr, setResetPassErr] = useState("");
  const [upiID, setUpiID] = useState('');
  const [qrCodeURL, setQrCodeURL] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const copyToClipboard = async () => {
    const tokenInput = document.getElementById("upi_id");
    try {
      await navigator.clipboard.writeText(tokenInput.innerHTML);
      alert("UPI ID copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  

  const get_upi =  ENDPOINTS.SEARCH_UPI_ID;
  const handleSearchUPI = async () => {
    setLoader(true);

    try {
      const response = await fetch(get_upi, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid: sessionid,
          upi_id: search,
        }),
      });

      const resData = await response.json();

      setLoader(false);

      if (resData.StatusCodes) {
        if (resData.StatusCodes === "00") {
          // Convert the single object response to an array
          const responseArray = [resData.responsed];
          setUPList(responseArray);
        } else {
          console.log(resData.mess.message);
        }
      }
    } catch (error) {
      setLoader(false);
      console.error("Error during account search:", error);
    }
  };

  // Filter data based on search input
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [data, search]);


  const handleStatusToggle = (rowData) => {
    // rowData.preventDefault();
    toggleStatus(rowData); // Call the function from parent
    
    
  };

  const renderHeader = (column) => (
    <th
      {...column.getHeaderProps()}
      onClick={(e) => {
        // e.preventDefault()
        onSort(column.accessor);
      } }
      className={column.isSortable ? 'sortable' : ''}
      style={{ borderBottom: 'solid 3px red', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '5px', textAlign: 'center' }}
    >
      {column.render('Header')}
      {column.isSortable && (
        <span>
          {sortBy === column.accessor
            ? sortDirection === 'asc'
              ? ' 🔼'
              : ' 🔽'
            : ''}
        </span>
      )}
    </th>
  );

  const Show_UPI_id = async (upi_id) => {
    try {

      console.log('DataPass for search:', upi_id);
      const response = await fetch(get_upi, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upi_id, sessionid }),
      });

      const resData = await response.json();
      console.log('UPI Data: ', resData);
      if (resData.StatusCodes === "00") {
        setUpiID(resData.responsed.upi_id);
        setQrCodeURL(resData.responsed.qr_code); // Set the QR code URL
        setIsModalOpen(true); // Open the modal
      } else {
        console.log("If status code is not 00, handle the error");
      }
    } catch (error) {
      console.error("Error fetching UPI data:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const columns = React.useMemo(
    () => [
    //   { Header: 'ID', accessor: '_id' },
    {
      Header: 'S.No',
      id: 'row',
      Cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      }
    },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Time', accessor: 'time' },
    //   { Header: 'Timestamp', accessor: 'timestamp' },
      { Header: 'Bank', accessor: 'upi_bank' },
      { Header: 'UPI Address', accessor: 'upi_id',

        Cell: ({row}) => (
          <div>
           <HStack>
           <Text className='p-2 border-2' style={{color:'var(--bg-text)'}}>
            {row.original.upi_id}
          </Text>
              <CopyButtonIcon data={row.original.upi_id === row.original.upi_id ? row.original.upi_id : ''} style={{BackgroundColor:'#f8dcdc !important'}}/>
              <QRCodeButton data={row.original.upi_id} openModal={Show_UPI_id} style={{ backgroundColor: '#f8dcdc !important' }}/>
            
           </HStack>
          </div>
          )
      },
      // { Header: 'Status', accessor: 'upistatus' , Cell: ({ row }) => (
      //   <span>{row.original.upistatus === 'Y' ? 'Active' : 'Disable'}</span>
      // )},
      { Header: 'Request Type', accessor: 'request_type' },
      {
        Header: 'Action',
        accessor: '  ',
        Cell: ({ row }) => (
          <button
            onClick={(e) => {
             
              handleStatusToggle(row.original);
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: row.original.upistatus === 'Y' ? 'green' : 'linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)',
              color: row.original.upistatus === 'N' ? 'black' : 'white',
              border: 'none',
              borderRadius: '25px',
            }}
          >
            {row.original.upistatus === 'Y' ? 'Active' : 'Disable'}
          </button>
          // <div>
          //   <Stack spacing={10} childrenRenderMode="clone" alignItems="center" justifyContent="center">
          // {/* <Toggle size="lg">Large</Toggle>
          // <Toggle size="md">Medium</Toggle> */}
          //       <Toggle size="md" color="green"  onChange={(e) => {
          //     // e.preventDefault();
          //     handleStatusToggle(row.original);
          //   }}
          //   loading={!row.original.upistatus}
          //   defaultChecked={row.original.upistatus === 'Y'}// Reflects the current status
          //   checkedChildren={<CheckIcon />}
          //   unCheckedChildren={<CloseIcon />}></Toggle>
          //     </Stack>
          // </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  return (

    <>

        <div className='top bg-white mt-0 center'>
          <div className='row mt-0'>
          <div className= "col-lg-12 col-md-12 col-12">
            <HStack>
                      
                          <HStack>
                          <div className='d-flex mr-3 p-3 center' style={{width: '450px'}}>
                            <DateRangeToolBar />
                          </div>
                            </HStack>           
                        <HStack>
                        <div className='d-flex mr-3 p-3 center'>
                            <input
                                  type="text"
                                  className="searchTerm"
                                  placeholder="Search ID/Ref Number"
                                  value={search}
                                  onChange={(e) => {
                                    setSearch(e.target.value);
                                  }}
                                  style={{width:'250px !important', justifyItems:'center'}}
                                />
                                <button
                                  className="searchIconBtn"
                                  onClick={(e) => {
                                    // e.preventDefault();
                                    console.log(search);
                                    handleSearchUPI();
                                  }}
                                >
                                  <FiSearch />
                                
                                </button>
                          </div>
                        </HStack>
                        <HStack>
                        <CustomButtonGroup appearance="ghost"/>
                        </HStack>
                              {/* </Panel> */}
                </HStack>
          </div>
          </div>
          <div className='row mt-0'>
            <div className= "col-lg-12 col-md-12 col-12">
                  <table {...getTableProps()} style={{ border: 'solid 1px blue', width: '100%', overflowY: true }}>
                          <thead>
                            {headerGroups.map(headerGroup => (
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {/* {headerGroup.headers.map(column => (
                                  <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 3px red', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '5px', textAlign:'center'}}>
                                    {column.render('Header')}
                                  </th>
                                ))} */}
                                {headerGroup.headers.map(renderHeader)}
                              </tr>
                            ))}
                          </thead>
                          <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                              prepareRow(row);
                              return (
                                <tr {...row.getRowProps()} style={{ background: row.original.upistatus === 'Y' ? 'lightgreen' : 'lightcoral' }}>
                                {row.cells.map(cell => (
                                    <td
                                      {...cell.getCellProps()}
                                      style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'var(--bg)',
                                        fontSize: '13px',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        color: 'var(--text-color)'
                                      }}
                                    >
                                      {cell.render('Cell')}
                                    </td>
                                  ))}
                              </tr>
                              );
                            })}
                          </tbody>
                        </table>
            </div>
              
              </div>
          </div>
            {/* UPI Modal Component */}
        <UpiModal
                upiID={upiID}
                qrCodeURL={qrCodeURL}
                isOpen={isModalOpen}
                onClose={handleModalClose}
              />


          
    </>
  );
};

export default UpiListTable;