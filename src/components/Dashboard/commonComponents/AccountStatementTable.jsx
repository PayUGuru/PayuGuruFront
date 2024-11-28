
import React, { useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import "rsuite/Panel/styles/index.css";
import { HStack, Stack, Toggle, Text } from "rsuite";
import "rsuite/Toggle/styles/index.css";
import "rsuite/Stack/styles/index.css";
import CopyButtonIcon from "./CopyButtonIcon";

const AccountStatementTable = ({
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

  const columns = React.useMemo(
    () => [
      {
        Header: "S.No",
        id: "row",
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      { Header: "Date", accessor: "date" },
      { Header: "Time", accessor: "time" },
      { Header: "Bank", accessor: "AC_bank" },
      {
        Header: "Bank Account No",
        accessor: "AC_id",
        Cell: ({ row }) => (
          <div>
            <HStack>
              <Text
                className="p-2 border-2"
                style={{ color: "var(--bg-text)" }}
              >
                {row.original.AC_id}
              </Text>
              <CopyButtonIcon
                data={
                  row.original.AC_id === row.original.AC_id
                    ? row.original.AC_id
                    : ""
                }
              />
            </HStack>
          </div>
        ),
      },
      { Header: "IFSC Code", accessor: "AC_ifsc" },
      { Header: "Swift Code", accessor: "AC_swift" },
      // { Header: 'Status', accessor: 'ACstatus' },
      { Header: "Request Type", accessor: "request_type" },
      {
        Header: "Action",
        accessor: "  ",
        Cell: ({ row }) => (
          <button
            onClick={(e) => {
              // e.preventDefault();

              handleStatusToggle(row.original);
            }}
            style={{
              padding: "5px 10px",
              backgroundColor:
                row.original.ACstatus === "Y"
                  ? "green"
                  : "linear-gradient(97.38deg, #FD6525 14.66%, #EB780E 55.73%)",
              color: row.original.ACstatus === "N" ? "black" : "white",
              border: "none",
              borderRadius: "25px",
            }}
          >
            {row.original.ACstatus === "Y" ? "Active" : "Disable"}
          </button>
          
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
        fontWeight: "bold",
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
                            padding: "10px",
                            border: "solid 1px gray",
                            background: "var(--bg)",
                            fontSize: "13px",
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
    </>
  )
}

export default AccountStatementTable