import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
// Import Axios
import { useTable, useSortBy } from "react-table";
import { ENDPOINTS } from "../../../utils/apiConfig";
// import generatePDF from '../../../hooks/usePdfAccountListGenerate'

import Panel from "rsuite/Panel";

import "rsuite/Panel/styles/index.css";
import DateRangeToolBar from "../PageToolbar";
import { HStack, Stack, Toggle, Text } from "rsuite";
import CheckIcon from "@rsuite/icons/Check";
import CloseIcon from "@rsuite/icons/Close";
import "rsuite/Toggle/styles/index.css";
import "rsuite/Stack/styles/index.css";
import CustomButtonGroup from "./TableIconButtons";
import CopyButtonIcon from "./CopyButtonIcon";
import VirtualAccPopUp from "./VirtualAccPopUp";
import { Button } from "@mui/material";

const VirtualAccountTable = ({
  data,
  toggleStatus,
  onSort,
  sortBy,
  sortDirection,
}) => {
  const [search, setSearch] = useState("");
  const [acList, setAcList] = useState([]);
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);

  const [modalOpened, setModalOpened] = useState(false);

  const [popupData, setPopupData] = useState(null);

  
  // Filter data based on search input
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  const handleStatusToggle = (rowData) => {
    // rowData.preventDefault();
    toggleStatus(rowData); // Call the function from parent
  };

  // const handleSearchAcc = async () => {
  //   setLoader(true);

  //   try {
  //     const response = await fetch(ENDPOINTS.SEARCH_VIRTUAL_ACC, {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         sessionid: sessionid,
  //         AC_id: search,
  //       }),
  //     });

  //     const resData = await response.json();
  //     console.log("====================================");
  //     console.log("Account Search Result: ", resData);
  //     console.log("====================================");
  //     setLoader(false);

  //     if (resData.StatusCodes) {
  //       if (resData.StatusCodes === "00") {
  //         // Convert the single object response to an array
  //         const responseArray = [resData.responsed];
  //         setAcList(responseArray);
  //       } else {
  //         console.log(resData.mess.message);
  //       }
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     console.error("Error during account search:", error);
  //   }
  // };

  const columns = React.useMemo(
    () => [
      {
        Header: "S.No",
        id: "row",
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      // { Header: "Date", accessor: "date" },
      // { Header: "Time", accessor: "time" },
      // { Header: "Bank", accessor: "AC_bank" },
      {
        Header: "Bank Account No",
        accessor: "AC_id",
        Cell: ({ row }) => (
          // <div>
          //   <Button
          //   variant="contained"
          //   color="primary"
          //   onClick={() => {setModalOpened(true); setPopupData(row.original)}}
          //   // onClick={() => handlePopupOpen(row.original)}
          // >
          //   View ACC
          // </Button>
          <div style={{textAlign:"center", AlignItems:"center", display:"inline-flex"}}>
            <p style={{marginRight:"1rem", fontSize:"12px" }}>
                {row.original.AC_id}
              </p>
              <CopyButtonIcon
              data={row.original.AC_id}
              style={{ backgroundColor: 'var(--heading-color) !important'}}
            />
          <button
            onClick={(e) => {
              // e.preventDefault();

              setModalOpened(true); setPopupData(row.original)
            }}
            className="btn btn-light-view"
            style={{
              padding: "2px 2px",
              // fontSize:"10px",
              // backgroundColor: row.original.ACstatus === "Y" ? "green" : "linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)",
              // color: row.original.ACstatus === "N" ? "black" : "white",
              border: "none",
              borderRadius: "25px",
            }}
          >
            {row.original.ACstatus === "Y" ? "View" : "Disable"}
          </button>
          
         </div>
        ),
      },
      { Header: "IFSC Code", accessor: "AC_ifsc" ,
        Cell: ({ row }) => (
        <div style={{textAlign:"center", AlignItems:"center", display:"inline-flex"}}>
            <p style={{marginRight:"1rem", fontSize:"12px"}}>
                {row.original.AC_ifsc}
              </p>
              <CopyButtonIcon
                  data={row.original.AC_ifsc}
                  style={{ backgroundColor: 'var(--heading-color) !important' }}
                />

        
            </div>
        )
       },
      { Header: "Swift Code", accessor: "AC_swift" , 
        Cell: ({ row }) => (
          <div style={{textAlign:"center", AlignItems:"center", display:"inline-flex"}}>
        <p style={{marginRight:"1rem" , fontSize:"12px"}}>
                {row.original.AC_swift}
              </p>
        <CopyButtonIcon
                  data={row.original.AC_swift}
                  style={{ backgroundColor: 'var(--heading-color) !important' }}
                />

          </div>
        )
      },
      // { Header: 'Status', accessor: 'ACstatus' },
      // { Header: "Request Type", accessor: "request_type" },
      {
        Header: "Action",
        accessor: "  ",
        Cell: ({ row }) => (
          <button
            onClick={(e) => {
              // e.preventDefault();

              handleStatusToggle(row.original);
            }}
            className="btn btn-light-action"
            style={{
              padding: "2px 2px",
              // fontSize:"10px",
              backgroundColor: row.original.ACstatus === "Y" ? "green" : "linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)",
              color: row.original.ACstatus === "N" ? "black" : "white",
              border: "none",
              borderRadius: "25px",
            }}
          >
            {row.original.ACstatus === "Y" ? "Active" : "Disable"}
          </button>
          //   <div>
          //   <Stack spacing={10} childrenRenderMode="clone" alignItems="center" justifyContent="center">
          // {/* <Toggle size="lg">Large</Toggle>
          // <Toggle size="md">Medium</Toggle> */}
          //       <Toggle size="md" color="green"  onChange={(e) => {
          //     // e.preventDefault();
          //     handleStatusToggle(row.original);
          //   }}
          //   loading={!row.original.ACstatus}
          //   defaultChecked={row.original.ACstatus === 'Y'}// Reflects the current status
          //   checkedChildren={<CheckIcon />}
          //   unCheckedChildren={<CloseIcon />}></Toggle>
          //     </Stack>
          // </div>
        ),
      },
    ],
    []
  );




  const renderHeader = (column) => (
    <th
      {...column.getHeaderProps()}
      onClick={(e) => {
        // e.preventDefault()
        onSort(column.accessor);
      }}
      className={column.isSortable ? "sortable" : ""}
      style={{
        borderBottom: "solid 3px red",
        background: "aliceblue",
        color: "black",
        fontSize:"13px",
        // fontWeight: "bold",
        padding: "5px",
        textAlign: "center",
      }}
    >
      {column.render("Header")}
      {column.isSortable && (
        <span>
          {sortBy === column.accessor
            ? sortDirection === "asc"
              ? " 🔼"
              : " 🔽"
            : ""}
        </span>
      )}
    </th>
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData }, useSortBy);

  return (
    <>
      {/* <Stack> */}
      <div className="top bg-white mt-0 center">
        {/* <div className="row mt-0">
          <div className="col-lg-12 col-md-12 col-12">
            <HStack>
              <HStack>
                <div
                  className="d-flex mr-3 p-3 center"
                  style={{ width: "450px" }}
                >
                  <DateRangeToolBar />
                </div>
              </HStack>
              <HStack>
                <div className="d-flex mr-3 p-3 center">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="Search ID/Ref Number"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    style={{
                      width: "250px !important",
                      justifyItems: "center",
                    }}
                  />
                  <button
                    className="searchIconBtn"
                    onClick={(e) => {
                      
                      console.log(search);
                      handleSearchAcc();
                    }}
                  >
                    <FiSearch />
                  </button>
                </div>
              </HStack>
              <HStack>
                <CustomButtonGroup appearance="ghost" />
              </HStack>
              
            </HStack>
          </div>
        </div> */}
        <div className="row mt-0">
          <div className="col-lg-12 col-md-12 col-12">
            <table
              id="virtual-account-list"
              {...getTableProps()}
              style={{
                border: "solid 1px blue",
                width: "100%",
                overflowY: true,
              }}
               className="font-semibold"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {/* {headerGroup.headers.map(column => (
                  // <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ borderBottom: 'solid 3px red', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '5px', textAlign: 'center' }}>
                  //   {column.render('Header')}
                  //   <span>
                  //         {column.isSorted
                  //           ? column.isSortedDesc
                  //             ? ' 🔽'
                  //             : ' 🔼'
                  //           : ''}
                  //       </span>
                  // </th>

                  
                // ))}  */}

                    {headerGroup.headers.map(renderHeader)}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      style={{
                        background:
                          row.original.ACstatus === "Y"
                            ? "lightgreen"
                            : "lightcoral",
                      }}
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "1px",
                            border: "solid 1px gray",
                            background: "var(--bg)",
                            fontSize: "10px",
                            alignItems: "center",
                            textAlign: "center",
                            color: "var(--text-color)",
                          }}
                        >
                          {cell.render("Cell")}
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
      {/* </Stack> */}
      {/* Popup Component */}
      <VirtualAccPopUp
        data={popupData}
        opened={modalOpened}
        onClose={() => {setModalOpened(false); setPopupData(null)}}
      />
      
    </>
  );
};

export default VirtualAccountTable;
