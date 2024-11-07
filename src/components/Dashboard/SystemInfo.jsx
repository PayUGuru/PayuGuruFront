import React, { useEffect } from "react";
import Dheader from '../Dheader';
import Dfooter from '../Dfooter';
import './Webhook.css';
import { useNavigate } from "react-router-dom";
import ProfileTopbar from "./commonComponents/ProfileTopbar";
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import useInactivityTimeout from "../../hooks/useInactivityTimeout";
import { Text, Table } from '@mantine/core';
import { useNetwork , useOs} from '@mantine/hooks';
const packageJson = require('../../../package.json');
function SystemInfo(){

    // Timeout Activity
    const isInactive = useInactivityTimeout(600000); // 10 minutes
    let navigate = useNavigate();
    let networkStatus = useNetwork();
    const API_Version = '0.0.01-beta';
    let APP_Version =  " ";
    // let versionToDisplay = "unknown";
    try {
      APP_Version = packageJson.version; // Assuming VERSION is globally defined, e.g., through a bundler
    } catch (error) {
      APP_Version = "unknown";
        console.log("Cannot get version of application.");
    }
    const os = useOs();
    useEffect(() => {
        if (isInactive) {
         sessionStorage.removeItem("sessionid");
        navigate("/login");
        }
    }, [isInactive, navigate]);
    return(
        <div>
            <div className="wrapper">
                <Dheader/>
                <div className="main-content">
                    <div className="top bg-white mt-0 p-2">
                        <DashboardTopbar />
                    </div>

                    <div className="row">
                        <ProfileTopbar />
                    </div>

                    <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                            <div className="card pb-0 h-theme account-details border-0 shadow-lg">
                                <h3 className="mt-0 p-3 h-theme">System Info</h3>
                                <div className="card-body p-5">
                                <Table maw={450} layout="fixed" mx="auto">
                                  <Table.Thead>
                                    <Table.Tr>
                                      <Table.Th>Property</Table.Th>
                                      <Table.Th>Value</Table.Th>
                                    </Table.Tr>
                                  </Table.Thead>
                                  <Table.Tbody>
                                    <Table.Tr>
                                      <Table.Td>Online</Table.Td>
                                      <Table.Td>
                                        <Text size="sm" c={networkStatus.online ? 'teal.6' : 'red.6'}>
                                          {networkStatus.online ? 'Online' : 'Offline'}
                                        </Text>
                                      </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                      <Table.Td>Os</Table.Td>
                                      <Table.Td>
                                        <Text size="sm">
                                        <>Your os is <b>{os}</b></>
                                        </Text>
                                      </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                      <Table.Td>rtt</Table.Td>
                                      <Table.Td>{networkStatus.rtt}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                      <Table.Td>downlink</Table.Td>
                                      <Table.Td>{networkStatus.downlink}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                      <Table.Td>effectiveType</Table.Td>
                                      <Table.Td>{networkStatus.effectiveType}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                      <Table.Td>Network Type</Table.Td>
                                      <Table.Td>{networkStatus.type ? networkStatus.type : 'unknown'}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                      <Table.Td>Application Version</Table.Td>
                                      <Table.Td>{APP_Version ? APP_Version : 'unknown'}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                      <Table.Td>API Version</Table.Td>
                                      <Table.Td>{API_Version ? API_Version: 'unknown'}</Table.Td>
                                    </Table.Tr>
                                    {/* <Table.Tr> */}
                                      {/* <Table.Td>saveData</Table.Td> */}
                                      {/* <Table.Td>
                                        <Text size="sm" c={networkStatus.saveData ? 'teal.6' : 'red.6'}>
                                          {networkStatus.saveData ? 'true' : 'false'}
                                        </Text>
                                      </Table.Td> */}
                                    {/* </Table.Tr> */}
                                  </Table.Tbody>
                                </Table>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                  <Dfooter/>  
                </div>
            </div>
        </div>
    )
}

export default SystemInfo;
