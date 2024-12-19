import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Paper as Pep} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import "./Table.css";
import { faCircleCheck , faCircleXmark, faCircleInfo} from "@fortawesome/free-regular-svg-icons";

function createData(trackingId,TransactionTime, TransactionType, Payment_Mode,TransactionAmount, Fess_n_GST,Settlement_Amount,Closing_Amount,Credit_Debit, status) {
  return {trackingId, TransactionTime,TransactionType, Payment_Mode,TransactionAmount, Fess_n_GST,Settlement_Amount,Closing_Amount,Credit_Debit, status};
}

const rows = [
  createData(18908424, "2 March 2022","UPI","QR Scan","500", "5", "495", "495", "490","Approved"),
  createData(18908424, "2 March 2022","UPI","QR Scan","500", "5", "495", "990", "490","Pending"),
  createData(18908424, "2 March 2022","UPI","QR Scan","500", "5", "495", "1485", "490","Approved"),
  createData(18908421, "2 March 2022","UPI","QR Scan","500", "5", "495", "1498", "490","Failed"),
];


// const makeStyle=(status)=>{
//   if(status === 'Approved')
//   {
//     return {
//       background: 'var(--bg-approved-tag)',
//       color: 'var(--text-approved-tag)',
//       TextAlign: "center",
//       justifyContent: "flex-start",
//       justifyTtems: "center",
//       display: "inline-flex",
//       flexDirection: "row",
//       alignItems: "center"
//     }
//   }
//   else if(status === 'Pending')
//   {
//     return{
//       background: 'var(--bg-pending-tag)',
//       color: 'var(--text-pending-tag)',
//       TextAlign: "center",
//       justifyContent: "flex-start",
//       justifyTtems: "center",
//       display: "inline-flex",
//       flexDirection: "row",
//       alignItems: "center"
//     }
//   }
//   else if(status === 'Failed')
//   {
//     return{
//       background: 'var(--bg-failed-tag)',
//       color: 'var(--text-failed-tag)',
//       TextAlign: "center",
//       justifyContent: "flex-start",
//       justifyTtems: "center",
//       display: "inline-flex",
//       flexDirection: "row",
//       alignItems: "center"
//     }
//   }
//   else{
//     return{
//       background: 'var(--bg-ongoing-tag)',
//       color: 'var(--text-ongoing-tag)',
//       TextAlign: "center",
//       justifyContent: "flex-start",
//       justifyTtems: "center",
//       display: "inline-flex",
//       flexDirection: "row",
//       alignItems: "center"
//     }
//   }
// }

const makeStyle = (status) => {
  const baseStyle = {
    textAlign: "center",
    // justifyContent: "center",
    justifyContent: "flex-start",
    justifyTtems: "center",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "2px 6px",
    borderRadius: "25px",
    fontWeight: 500,
    fontSize: "12px",
  };

  switch (status) {
    case 'Approved':
      return { ...baseStyle, background: 'var(--bg-approved-tag)', color: 'var(--text-approved-tag)' };
    case 'Pending':
      return { ...baseStyle, background: 'var(--bg-pending-tag)', color: 'var(--text-pending-tag)' };
    case 'Failed':
      return { ...baseStyle, background: 'var(--bg-failed-tag)', color: 'var(--text-failed-tag)' };
    default:
      return { ...baseStyle, background: 'var(--bg-ongoing-tag)', color: 'var(--text-ongoing-tag)' };
  }
};

const StatusBadge = ({ status }) => {
  const icon = {
    Approved: <FontAwesomeIcon icon={faCircleCheck} style={{ color: "var(--text-approved-tag)", marginRight: "4px" }} />,
    Pending: <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "var(--text-pending-tag)", marginRight: "4px" }} />,
    Failed: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "var(--text-failed-tag)", marginRight: "4px" }} />,
  };

  return (
    <span style={makeStyle(status)}>
      {icon[status] || <FontAwesomeIcon icon={faCircleXmark} style={{ marginRight: "4px" }} />}
      {status}
    </span>
  );
};
// const transactions = [
//   {
//     id: 1,
//     date: '2024-02-20',
//     description: 'Payment received from John Doe',
//     amount: 15000,
//     status: 'completed',
//   },
//   {
//     id: 2,
//     date: '2024-02-19',
//     description: 'Refund processed',
//     amount: -2500,
//     status: 'completed',
//   },
//   {
//     id: 3,
//     date: '2024-02-19',
//     description: 'Payment received from Alice Smith',
//     amount: 8000,
//     status: 'pending',
//   },
//   {
//     id: 4,
//     date: '2024-02-18',
//     description: 'Subscription payment',
//     amount: 12000,
//     status: 'completed',
//   },
// ];
export function BasicTable() {
  return (
      <div className="Table theme h-theme">
     
      {/* <h3>Recent Orders</h3> */}
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029", border:"1px 20px 0px  #80808029" , borderRadius:"5px"}}
          className="theme h-theme"
        >
          <Pep shadow="xs"  radius="md" withBorder>
          <Table sx={{ minWidth: 650, border:"1px 20px 0px  #80808029" }} aria-label="simple table">
            <TableHead sx={{border:"1px 20px 0px  #80808029"}}>
              <TableRow sx={{border:"1px 20px 0px  #80808029"}}>
                <TableCell>ID</TableCell>
                {/* <TableCell align="left">Tracking ID</TableCell> */}
                <TableCell align="left">Transaction Time</TableCell>
                <TableCell align="left">Transaction Type</TableCell>
                <TableCell align="left">Payment Mode</TableCell>
                <TableCell align="left">Transaction Amount</TableCell>
                <TableCell align="left">Fess & GST</TableCell>
                <TableCell align="left">Settlement Amount</TableCell>
                <TableCell align="left">Closing Amount</TableCell>
                <TableCell align="left">Credit/Debit</TableCell>
                <TableCell align="left">Status</TableCell>
                {/* <TableCell align="left">View</TableCell> */}


                {/* <th>ID</th>
                          <th>Transaction Time</th>
                          <th>Transaction Type</th>
                          <th>Payment Mode</th>
                          <th>Transaction Amount</th>
                          <th>Fess & GST</th>
                          <th>Settlement Amount</th>
                          <th>Closing Amount</th>
                          <th>Credit/Debit</th>
                          <th>Status</th> */}
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.trackingId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.trackingId}
                  </TableCell>
                  {/* <TableCell align="left"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`} style={makeStyle(row.status)}>
                  {row.trackingId}
                    </span></TableCell> */}
                  <TableCell align="left">{row.TransactionTime}</TableCell>
                  <TableCell align="left">{row.TransactionType}</TableCell>
                  <TableCell align="left">{row.Payment_Mode}</TableCell>
                  <TableCell align="left">{row.TransactionAmount}</TableCell>
                  <TableCell align="left">{row.Fess_n_GST}</TableCell>
                  <TableCell align="left">{row.Settlement_Amount}</TableCell>
                  <TableCell align="left">{row.Closing_Amount}</TableCell>
                  <TableCell align="left">{row.Credit_Debit}</TableCell>
                  <TableCell align="left">
                     {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                   row.status === 'completed'
                     ? 'bg-green-100 text-green-800'
                     : 'bg-yellow-100 text-yellow-800'
                     }`} style={makeStyle(row.status) }>
                  {row.status === "Approved"? <FontAwesomeIcon icon={faCircleCheck}  style={{textAlign:"center", AlignItems:"center", display:"inline-flex", color: row.status === 'completed' ? "#7cd902" : "var(--text-approved-tag)",  marginRight:"2px"}} /> :  <FontAwesomeIcon icon={faCircleXmark}  style={{textAlign:"center", AlignItems:"center", display:"inline-flex", color: row.status === 'Failed' ? "#ffadad8f" : "var(--text-color)", marginRight:"2px"}} /> }
                  
                  {row.status}
                </span>  */}
                <StatusBadge status={row.status} />
                    {/* // <span className="status" style={makeStyle(row.status)}>{row.status}</span> */}
                  </TableCell>
                  {/* <TableCell align="left" className="Details">View</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Pep>
        </TableContainer>
      
      </div>

    //   <div className="Table">
    //        <div className="overflow-x-auto">
    //   <table className="min-w-full divide-y divide-gray-200">
    //     <thead>
    //       <tr>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Date
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Description
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Amount
    //         </th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Status
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody className="bg-white divide-y divide-gray-200">
    //       {transactions.map((transaction) => (
    //         <tr key={transaction.id}>
    //           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //             {transaction.date}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
    //             {transaction.description}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap text-sm">
    //             <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
    //               ₹{Math.abs(transaction.amount).toLocaleString()}
    //             </span>
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap text-sm">
    //             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
    //               transaction.status === 'completed'
    //                 ? 'bg-green-100 text-green-800'
    //                 : 'bg-yellow-100 text-yellow-800'
    //             }`}>
    //               {transaction.status}
    //             </span>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    //   </div>
  );
}

export default BasicTable;