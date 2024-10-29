import React, { useEffect, useState, useCallback } from "react";
import Dheader from "../Dheader";
import Dfooter from "../Dfooter";
import "./Virtualaccount.css";
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import VirtualAccountTable from "./commonComponents/VirtualAccountTable"; // Adjust the path as necessary
import { FetchVirtualAccountList } from "./commonComponents/data";
import Pagination from "../Pagination";
import { ENDPOINTS } from "../../utils/apiConfig";

import DateRangeToolBar from "./PageToolbar";
import { HStack } from "rsuite";
import { FiSearch } from "react-icons/fi";
import CustomButtonGroup from "./commonComponents/TableIconButtons";

// import TaskComponent from "../../app/components/Table/TaskPage";

function VirtualAccount() {
  const [acList, setAcList] = useState([]);
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isFetching, setIsFetching] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [search, setSearch] = useState("");

  const fetchData = useCallback(
    async (page = 1, loadMore = false) => {
      setLoader(true);
      try {
        const skipItems = (page - 1) * itemsPerPage;
        const response = await FetchVirtualAccountList(skipItems, itemsPerPage);

        const paginationData = await response.data.pagination;
        const tasksData = await response.data.virtual_account_list;

        setTotalItems(paginationData.totalCount);
        setCurrentPage(paginationData.currentPage);
        setRemaining(paginationData.remainingItems);
        if (!loadMore) {
          setAcList(JSON.parse(tasksData));
        } else {
          setAcList((prevList) => [...prevList, ...JSON.parse(tasksData)]);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoader(false);
      }
    },
    [itemsPerPage, sortBy, sortDirection]
  );

  useEffect(() => {
    fetchData(currentPage, false);
  }, [fetchData, currentPage]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && !isFetching) {
  //       setIsFetching(true);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    fetchData(currentPage + 1, true).then(() => {
      setIsFetching(false);
    });
  }, [isFetching, currentPage, fetchData]);

  const toggleStatus = async (account) => {
    try {
      let accountNumber = account.AC_id;
      const response = await fetch(ENDPOINTS.UPDATE_VIRTUAL_ACCOUNT_STATUS, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AC_id: accountNumber,
          sessionid: sessionid,
        }),
      });

      const resData = await response.json();
      if (resData && resData.StatusCodes === "00") {
        setAcList((prevList) =>
          prevList.map((item) =>
            item.AC_id === accountNumber
              ? {
                  ...item,
                  status: item.status === "enabled" ? "disabled" : "enabled",
                }
              : item
          )
        );
        fetchData(currentPage); // Refresh the data after updating the status
      } else {
        console.log("status code not match");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchAcc = async () => {
    setLoader(true);

    try {
      const response = await fetch(ENDPOINTS.SEARCH_VIRTUAL_ACC, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionid: sessionid,
          AC_id: search,
        }),
      });

      const resData = await response.json();
      console.log("====================================");
      console.log("Account Search Result: ", resData);
      console.log("====================================");
      setLoader(false);

      if (resData.StatusCodes) {
        if (resData.StatusCodes === "00") {
          // Convert the single object response to an array
          const responseArray = [resData.responsed];
          setAcList(responseArray);
        } else {
          console.log(resData.mess.message);
        }
      }
    } catch (error) {
      setLoader(false);
      console.error("Error during account search:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage > currentPage) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (column) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortDirection(direction);
    fetchData(1, false); // Fetch data with new sorting
  };

  return (
    <div>
      <div className="wrapper">
        <Dheader />
        <div className="main-content">
          <div className="top bg-white mt-0 p-2">
            <DashboardTopbar />
          </div>

          <div className="row mb-3">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="card pb-0 h-theme account-details border-0 shadow-lg">
                <h4 className="bg-transparent mt-0 p-3 h-theme mb-0">
                      Virtual Accounts
                  </h4>
                {/* <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                    
                  </div>

                  <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                    <div className="d-flex justify-content-end align-items-center pt-2">
                      <button className="btn  btn1 mr-2 btn-outline-secondary">
                        Add Virtual Account<i className="fa fa-plus ml-2"></i>
                      </button>
                      <button className="btn btn1 mr-2 btn-outline-secondary">
                        Export <i className="fa fa-external-link ml-2"></i>
                      </button>
                      <button className="btn btn1 bg-dark text-white mr-2">
                        Filter <i className="fa fa-filter ml-2"></i>
                      </button>
                    </div>
                  </div>

                </div> */}
                <div className="card-body p-3">
                  <div className="row mt-0">
                    {/* <div className="col-lg-5 col-sm-12">
                      <HStack>
                          <div
                            className=""
                            style={{ width: "450px" }}
                          >
                            <DateRangeToolBar />
                          </div>
                      </HStack>
                    </div> */}
                    {/* <div className="col-lg-6 col-sm-12">
                      <HStack>
                          <div className="d-flex p-2">
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
                                e.preventDefault();
                                console.log(search);
                                handleSearchAcc();
                              }}
                            >
                              <FiSearch />
                            </button>
                          </div>
                        </HStack>
                    </div> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 customPaddng">
                    <div className="customBtnGrop">
                        <HStack>
                        <CustomButtonGroup appearance="ghost" />
                        {/* </Panel> */}
                        </HStack>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    {loader ? (
                      <div className="text-center p-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <VirtualAccountTable
                          data={acList}
                          toggleStatus={toggleStatus}
                          onSort={handleSort}
                          sortBy={sortBy}
                          sortDirection={sortDirection}
                        />
                        <Pagination
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                          totalItems={totalItems}
                          remaining={remaining}
                          onPageChange={handlePageChange}
                        />

                        {/* TAILWINDCSS Table Component with shadcn WIP */}
                        {/* <TaskComponent/> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dfooter />
        </div>
      </div>
    </div>
  );
}

export default VirtualAccount;
