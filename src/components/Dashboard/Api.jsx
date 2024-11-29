import React, { useContext, useState, useEffect } from "react";
import Dheader from "../Dheader";
import Dfooter from "../Dfooter";
import "./Api.css";
import { useNavigate } from "react-router-dom";
import ProfileTopbar from "./commonComponents/ProfileTopbar";
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import { Button } from "@mui/material";
import { ENDPOINTS } from "../../utils/apiConfig.js";
import lodingImg from "../../assets/img/loading.gif";
import { ApplicationContext } from "../../context/ApplicationContext";
import useInactivityTimeout from "../../hooks/useInactivityTimeout";
import CopyButtonIcon from "./commonComponents/CopyButtonIcon";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Group, ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

function Api() {
  const { kycStatus } = useContext(ApplicationContext);
  console.log("kyc Status :", kycStatus);
  const sessionid = sessionStorage.getItem("sessionid");
  const [loader, setLoader] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const [domain, setDomain] = useState("");
  const [ipAddresses, setIpAddresses] = useState([""]);

  const handleAddIpField = () => {
    setIpAddresses([...ipAddresses, ""]);
  };

  const handleIpChange = (index, value) => {
    const updatedIps = [...ipAddresses];
    updatedIps[index] = value;
    setIpAddresses(updatedIps);
  };

  const handleDeleteIpField = (index) => {
    setIpAddresses(ipAddresses.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Domain:", domain);
    console.log("IP Addresses:", ipAddresses);
    close();
  };

  const copyToClipboard = async () => {
    const tokenInput = document.getElementById("api-token");
    try {
      await navigator.clipboard.writeText(tokenInput.value);
      // alert("API Token copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getApiToken = async () => {
    setLoader(true);

    try {
      const response = await fetch(ENDPOINTS.GET_API_KEY, {
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
      console.log(resData);
      setLoader(false);

      if (resData.mess) {
        if (resData.mess.StatusCodes === "DK00") {
          setApiKey(resData.mess.api_key);
          setClientSecret(resData.mess.client_secret);
        } else {
          console.log(resData.mess.message);
          alert(resData.mess.message);
        }
      }
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const toggleSecretClientVisibility = () => {
    setShowClientSecret(!showClientSecret);
  };
  // Timeout activity
  const isInactive = useInactivityTimeout(600000); // 10 minutes
  let navigate = useNavigate();

  useEffect(() => {
    if (isInactive) {
      sessionStorage.removeItem("sessionid");
      navigate("/login");
    }
  }, [isInactive, navigate]);

  return (
    <div>
      <div className="wrapper">
        <Dheader />
        <div className="main-content">
          <div className="top bg-white mt-0 p-2">
            <DashboardTopbar />
          </div>

          <div className="row">
            <ProfileTopbar />
          </div>

          <div className="row">
            <div className="col-xl-8 col-lg-12 col-md-12 col-12">
              <div className="card h-theme pb-0 account-details border-0 shadow-lg">
                <h3 className="mt-0 p-3 h-theme">API Settings</h3>
                <div className="card-body p-5">
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label">
                        API Token: api_id <CopyButtonIcon data={"api_id"} />
                      </label>
                      <label
                        className="form-label text-info"
                        onClick={getApiToken}
                        style={{ cursor: "pointer" }}
                      >
                        Click here
                      </label>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type={showApiKey ? "text" : "password"}
                        className="form-control mt-0"
                        id="api-token"
                        value={apiKey ? apiKey : "XXXXXX-XXXXXX-XXXXXXXX"}
                      />

                      <Button
                        variant="outlined"
                        title={showApiKey ? "Hide" : "Show"}
                        onClick={toggleApiKeyVisibility}
                      >
                        <span>
                          <i
                            className={`fa ${
                              showClientSecret ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </span>
                      </Button>
                      <span>
                        <i
                          className="mr-4"
                          color="success"
                          title="Copy"
                          onClick={copyToClipboard}
                        >
                          <CopyButtonIcon data={copyToClipboard} />
                        </i>
                      </span>
                      {/* <Button
                        variant="contained"
                        color="success"
                        title="Copy"
                        onClick={copyToClipboard}
                      >
                        <i className="fa fa-copy"></i>
                      </Button> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label">
                        Secret: client_secret{" "}
                        <CopyButtonIcon data={"client_secret"} />{" "}
                      </label>
                      <label
                        className="form-label text-primary"
                        onClick={getApiToken}
                        style={{ cursor: "pointer" }}
                      ></label>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type={showClientSecret ? "text" : "password"}
                        className="form-control mt-0"
                        id="api-token"
                        value={
                          clientSecret ? clientSecret : "XXXXXX-XXXXXX-XXXXXXXX"
                        }
                      />

                      <Button
                        variant="outlined"
                        title={showClientSecret ? "Hide" : "Show"}
                        onClick={toggleSecretClientVisibility}
                      >
                        <span>
                          <i
                            className={`fa ${
                              showClientSecret ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </span>
                      </Button>
                      <span>
                        <i
                          className="mr-4"
                          color="success"
                          title="Copy"
                          onClick={copyToClipboard}
                        >
                          <CopyButtonIcon data={copyToClipboard} />
                        </i>
                      </span>
                      {/* <Button
                        variant="contained"
                        // color="success"
                        title="Copy"
                        onClick={copyToClipboard}
                      > */}
                      {/* <i className="" onClick={copyToClipboard}><CopyButtonIcon data={copyToClipboard} /></i> */}
                      {/* </Button> */}
                    </div>

                    <label className="form-label">Whitelisted IPs</label>
                    <div className="mb-3">
                      <p className="text-info">
                        Configure which IP Addresses can access your account.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn1 float-right virtual-btn bg-red mb-5"
                      onClick={open}
                    >
                      Add Domain name
                    </button>
                  </div>
                </div>
              </div>
              <div className="loaderContainer">
                <div className="inputbox text-center loader-box">
                  {loader && (
                    <img
                      src={lodingImg}
                      alt="loading..."
                      className="loaderImg"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Dfooter />
        </div>
      </div>

      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <div className="my-4">
          <TextInput
            label="Domain Name"
            placeholder="Enter domain name"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
          />

          {ipAddresses.map((ip, index) => (
            <Group key={index} style={{ marginTop: 10 }} align="flex-end">
              <TextInput
                label={`IP Address ${index + 1}`}
                placeholder="Enter IP address"
                value={ip}
                onChange={(event) => handleIpChange(index, event.target.value)}
                style={{ flex: 1 }}
              />
              <ActionIcon
                color="red"
                onClick={() => handleDeleteIpField(index)}
              >
                <IconX size={16} />
              </ActionIcon>
            </Group>
          ))}

          <Button onClick={handleAddIpField} style={{ marginTop: 10 }}>
            Add IP Address
          </Button>
          <div className="d-flex justify-content-end">
            <Group position="right" mt="md">
              <Button
                className="btn btn1 float-right virtual-btn bg-red"
                onClick={handleSave}
              >
                Save
              </Button>
            </Group>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Api;
