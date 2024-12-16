import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(trackingId,TransactionTime, TransactionType, Payment_Mode,TransactionAmount, Fess_n_GST,Settlement_Amount,Closing_Amount,Credit_Debit, status) {
  return {trackingId, TransactionTime,TransactionType, Payment_Mode,TransactionAmount, Fess_n_GST,Settlement_Amount,Closing_Amount,Credit_Debit, status};
}

const rows = [
  createData(18908424, "2 March 2022","UPI","QR Scan","500", "5", "495", "495", "490","Approved"),
  createData(18908424, "2 March 2022","UPI","QR Scan","500", "5", "495", "990", "490","Pending"),
  createData(18908424, "2 March 2022","UPI","QR Scan","500", "5", "495", "1485", "490","Approved"),
  createData(18908421, "2 March 2022","UPI","QR Scan","500", "5", "495", "1498", "490","Failed"),
];


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else if(status === 'Failed')
  {
    return{
      background: '#ffadad9f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}


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
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          className="theme h-theme"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
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
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                   row.status === 'completed'
                     ? 'bg-green-100 text-green-800'
                     : 'bg-yellow-100 text-yellow-800'
                     }`} style={makeStyle(row.status)}>
                  {row.status}
                </span> 
                    {/* // <span className="status" style={makeStyle(row.status)}>{row.status}</span> */}
                  </TableCell>
                  {/* <TableCell align="left" className="Details">View</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
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