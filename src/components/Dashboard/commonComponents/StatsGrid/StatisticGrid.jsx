import React, { useContext, useEffect, useState } from "react";
import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { HStack } from 'rsuite';
import classes from './StatisticGridIcon.css';
import SparkleChart from '../Charts/SparkleChart';
import { ENDPOINTS } from '../../../../utils/apiConfig';
import { ApplicationContext } from '../../../../context/ApplicationContext';
import {TransactionWidget} from "../Charts/TransactionWidget"
import {Cards} from "../../Cards/Cards"
import {Updates} from "../../Notice/Notice"
export function StatisticGrid() {
  const { setKycStatus } = useContext(ApplicationContext);
  const dash_index = ENDPOINTS.DASH_BOARD;
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);
  const [dashboardIndex, setDashboardIndex] = useState({});
  const [mainBalance, setMainBalance] = useState(0);
  const [totalSettlement, setTotalSettlement] = useState(0);
  const [transactionData, setTransactionData] = useState({
    totalBySellerIdentifier: [],
    totalByPaymentAddress: [],
    txnTypeSummary: [],
    ReceivedSumOfTotalAmountByPaymentAddress: 0,
  });

  useEffect(() => {
    dashboardIndexData();
  }, [sessionid]);

  const dashboardIndexData = async () => {
    setLoader(true);
    try {
      const response = await fetch(dash_index, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid: sessionid,
        }),
      });

      const resData = await response.json();
      setLoader(false);

      if (resData.mess) {
        if (resData.mess.StatusCodes === "DI00") {
          setDashboardIndex(resData.mess);
          setMainBalance(resData.mess.mainbalance);
          setTotalSettlement(resData.mess.settelment);
          setTransactionData(resData.mess["AccountTransactions"][0]);
          setKycStatus(resData.mess.kyc_status);
          console.log('Transactional Data: ', transactionData[0])
        } else {
          // Handle error
        }
        if (resData.mess.kyc_status === "N") {
          const myModal = new window.bootstrap.Modal(
            document.getElementById("docsReqModal")
          );
          myModal.show();
        }
      } else {
        console.error("Unexpected response structure:", resData);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  };

  // Extracting transaction data for visualization
 
  const receivedAmount = transactionData.ReceivedSumOfTotalAmountByPaymentAddress;
  const txnSummeryOnTransationMode = transactionData.txnTypeSummary;
  const txnsOnAddresses = transactionData.totalByPaymentAddress;
  console.log('Txn Summery Based on Payment Type Method Use: ', txnSummeryOnTransationMode);
  // const totalBySeller = transactionData.totalBySellerIdentifier> 0 ? transactionData.totalBySellerIdentifier[0].totalAmountBySeller : 0;
  // const totalByPaymentAddress = transactionData.totalByPaymentAddress > 0 ? transactionData.totalByPaymentAddress.reduce((sum, item) => sum + item.totalAmountByPaymentAddress, 0) : 0;

  // Calculate the total number of transactions executed
  // const totalTransactions = transactionData.totalBySellerIdentifier.reduce(
  //   (sum, seller) => sum + seller.totalTransactionsBySeller, 0
  // ) + transactionData.totalByPaymentAddress.reduce(
  //   (sum, payment) => sum + payment.totalTransactionsByPaymentAddress, 0
  // );

  // Sample trend data, update with actual values from the state or API
  const positiveTrend = [
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];  // Replace with dynamic data
  const negativeTrend = [50, 40, 20, 40, 20, 40, 10];  // Replace with dynamic data
  const neutralTrend = [10, 20, 40, 20, 40, 10, 50, 5, 10];  // Replace with dynamic data

  const data = [
    { title: 'Recieved Amount', value: receivedAmount, diff: 34, trend: positiveTrend },
    // { title: 'Settlement', value: totalSettlement, diff: -13, trend: negativeTrend },
    // { title: 'Received Amount', value: receivedAmount, diff: 18, trend: neutralTrend },
    // { title: 'Total by Seller', value: totalBySeller, diff: 20, trend: positiveTrend },
    // { title: 'Total by Payment Address', value: totalByPaymentAddress, diff: 15, trend: neutralTrend },
    // { title: 'Total Transactions Executed', value: totalTransactions, diff: 10, trend: positiveTrend },
  ];

  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <div className='' key={stat.title}>
        <HStack>
          <Paper withBorder p="md" radius="md">
            <Group justify="apart">
              <SparkleChart trendData={stat.trend} />
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
                  {stat.title}
                </Text>
                <Text fw={700} fz="xl">
                  ₹ {stat.value}
                </Text>
              </div>
              <ThemeIcon
                color="gray"
                variant="light"
                style={{
                  color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
                }}
                size={38}
                radius="md"
              >
                <DiffIcon size="1.8rem" stroke={1.5} />
              </ThemeIcon>
            </Group>
            <Text c="dimmed" fz="sm" mt="md">
              <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
                {stat.diff}%
              </Text>{' '}
              {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
            </Text>
          </Paper>

          {/* <Paper withBorder radius="md" ml={0.4}>
          <div>
              <TransactionWidget/>
          </div>
          </Paper> */}
        </HStack>
      </div>
    );
  });

  return (
   
      <div className={classes.root}>
        
          <div className="row">
            <div className='col-lg-3 col-md-3 col-sm-12 mt-3'>
            <Paper shadow="xs"  radius="md" withBorder>
              <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
              </Paper>
            </div>
            <div className='col-lg-5 col-md-3 col-sm-12 mt-3'>
              <Paper shadow="xs"  radius="md" withBorder>

              <TransactionWidget/>
              </Paper>
           </div>
            <div className="col-lg-4 col-md-3 col-sm-12 mt-3 ">
            <Paper shadow="xs"  radius="md" withBorder>
              <div className="img-bg">
                {/* <img
                  src="https://i.ibb.co/Fx8FHCd/account-card-img.png"
                  alt="account-card-img"
                /> */}
             
                <Updates />   
              </div> 
              </Paper>

            </div>
        </div>
        
              <div className="row">
              <Cards />
              </div>
      </div>
    
  );
}

export default StatisticGrid;
