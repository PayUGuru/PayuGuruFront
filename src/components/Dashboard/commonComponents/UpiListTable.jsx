// UpiListTable.js
import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import { HStack } from "rsuite";
import { Button } from "@mui/material";
import UpiPopup from "./UpiPopup"; // New popup component
import { FiSearch } from "react-icons/fi";
import { ENDPOINTS } from "../../../utils/apiConfig";
import "rsuite/Toggle/styles/index.css";
import "rsuite/Stack/styles/index.css";
import UpiModal from "./UpiModel";
import QRCodeButton from "./QRCodeIcon";
import CopyButtonIcon from './CopyButtonIcon';

const UpiListTable = ({ data, toggleStatus }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const [modalOpened, setModalOpened] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState("");
  const [upiID, setUpiID] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const sessionid = sessionStorage.getItem("sessionid");


  const get_upi = ENDPOINTS.SEARCH_UPI_ID;
  // Filter data based on search input
  const filteredTableData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  
  const columns = React.useMemo(
    () => [
      {
        Header: "S.No",
        id: "row",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      // { Header: "Date", accessor: "date" },
      // { Header: "Last Transaction", accessor: "time" },
      { Header: "Bank", accessor: "upi_bank" },
      // { Header: "Upi Id", accessor: "upi_id" },
      {
        Header: "UPI",
        accessor: "upi_id",
        Cell: ({ row }) => (
          // <Button
          //   variant="contained"
          //   color="primary"
          //   onClick={() => {setModalOpened(true); setPopupData(row.original)}}
          //   // onClick={() => handlePopupOpen(row.original)}
          // >
          //   View UPI
          // </Button>
         <div style={{textAlign:"center", AlignItems:"center", display:"inline-flex"}}>

              {/* <button
              onClick={(e) => {
                // e.preventDefault();

                setModalOpened(true); setPopupData(row.original)
              }}
              style={{
                padding: "5px 10px",
                backgroundColor:
                  row.original.upistatus === "Y"
                    ? "green"
                    : "linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)",
                color: row.original.upistatus === "N" ? "black" : "white",
                fontSize:"14px",
                border: "none",
                borderRadius: "25px",
              }}
            >
              {row.original.upistatus === "Y" ? "View" : "Disable"}
            </button> */}
        <p style={{marginRight:"1rem"}}>
          {row.original.upi_id}
        </p>
        <CopyButtonIcon
              data={row.original.upi_id}
              style={{ backgroundColor: 'var(--heading-color) !important' }}
            />
        <QRCodeButton
                data={row.original.upi_id}
                openModal={Show_UPI_id}
                style={{ backgroundColor: "#f8dcdc !important", marginRight:"2rem" }}
              />
        <button
            onClick={(e) => {
              // e.preventDefault();

              setModalOpened(true); setPopupData(row.original)
            }}
            className="btn btn-light-view"
            style={{
              padding: "5px 10px",
              // backgroundColor: row.original.ACstatus === "Y" ? "green" : "linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)",
              // color: row.original.ACstatus === "N" ? "black" : "white",
              border: "none",
              borderRadius: "25px",
            }}
          >
            {row.original.upistatus === "Y" ? "View" : "Disable"}
          </button>
           
         </div>
        ),
      },
      // { Header: "Request Type", accessor: "request_type" },
      {
        Header: "Action",
        accessor: " ",
        Cell: ({ row }) => (
          // <Button
          //   variant="contained"
          //   color={row.original.upistatus === "Y" ? "success" : "warning"}
          //   onClick={() => toggleStatus(row.original)}
          // >
          //   {row.original.upistatus === "Y" ? "Active" : "Disable"}
          // </Button>
          <button
          onClick={(e) => {
            // e.preventDefault();

            handleStatusToggle(row.original);
          }}
          style={{
            padding: "5px 10px",
            backgroundColor:
              row.original.upistatus === "Y"
                ? "green"
                : "linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)",
            color: row.original.upistatus === "N" ? "black" : "white",
            fontSize:"14px",
            border: "none",
            borderRadius: "25px",
          }}
        >
          {row.original.upistatus === "Y" ? "Active" : "Disable"}
        </button>
        ),
      },
    ],
    []
  );
  const handleStatusToggle = (rowData) => {
    // rowData.preventDefault();
    toggleStatus(rowData); // Call the function from parent
  };

  const Show_UPI_id = async (upi_id) => {
    try {
      console.log("DataPass for search:", upi_id);
      const response = await fetch(get_upi, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upi_id, sessionid }),
      });

      const resData = await response.json();
      console.log("UPI Data: ", resData);
      if (resData.StatusCodes === "00") {
        setUpiID(resData.responsed.upi_id);
        console.log('====================================');
        console.log("QR Code url: ", resData.responsed.qr_code);
        console.log('====================================');
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


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredTableData });

  return (
    <>
      <div className="top bg-white mt-0 center">
        <div className="row mt-0 mb-3">
          <div className="col-lg-12">
            <div className="customSearchBox">
              <input
                type="text"
                className="searchTerm"
                placeholder="Search UPI ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="searchIconBtn">
                <FiSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-0">
          <div className="col-lg-12 col-md-12 col-12">
            <table
              {...getTableProps()}
              style={{
                border: "solid 1px blue",
                width: "100%",
              }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          borderBottom: "solid 3px red",
                          background: "aliceblue",
                          color: "black",
                          // fontWeight: "bold",
                          fontSize:"12px",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            // padding: "5px",
                            border: "solid 1px gray",
                            textAlign: "center",
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

      {/* Popup Component */}
      <UpiPopup
        data={popupData}
        opened={modalOpened}
        onClose={() => {setModalOpened(false); setPopupData(null)}}
      />
     
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