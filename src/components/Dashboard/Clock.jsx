import React, { useState, useEffect } from "react";
import { HStack} from "rsuite";
// import { Input, CloseButton } from '@mantine/core';
import { IconButton, ButtonToolbar, ButtonGroup} from "rsuite";
import { Icon } from "@rsuite/icons";
import { FaUserClock } from "react-icons/fa";
import "rsuite/Stack/styles/index.css";
import "rsuite/IconButton/styles/index.css";


const ClockCustomeButton = ({
  appearance,
  formatTime,
  time,
  toggleTimeFormat,
}) => (
  // <ButtonToolbar>
    // <ButtonGroup>
      <HStack>
        <IconButton
          appearance={"ghost"}
          icon={
            <Icon
              as={FaUserClock}
              size="1em"
              className="rs-btn-icon rs-btn-icon-placement-left rs-btn rs-btn-sm"
              onClick={toggleTimeFormat}
            />
          }
          
        >
          {formatTime(time)}
        </IconButton>
      </HStack>

      
    // </ButtonGroup>
  // </ButtonToolbar>
);

const Clock = () => {
  // State to hold the current time
  const [time, setTime] = useState(new Date());
  const kyc_status = sessionStorage.getItem("kyc_status");
  console.log("status: ", kyc_status);
  // Initialize the format state from localStorage or default to true
  const [is24HourFormat, setIs24HourFormat] = useState(() => {
    const savedFormat = localStorage.getItem("is24HourFormat");
    return savedFormat ? JSON.parse(savedFormat) : true;
  });

  // useEffect to update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format time according to the current format
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    let ampm = "";

    if (!is24HourFormat) {
      ampm = hours >= 12 ? " PM" : " AM";
      hours = hours % 12 || 12; // Convert to 12-hour format
    }

    hours = String(hours).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}${ampm}`;
  };

  // Toggle time format between 12-hour and 24-hour and save to localStorage
  const toggleTimeFormat = () => {
    setIs24HourFormat((prevFormat) => {
      const newFormat = !prevFormat;
      localStorage.setItem("is24HourFormat", JSON.stringify(newFormat));
      return newFormat;
    });
  };

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "1rem",
        textAlign: "center",
        
      }}
    >
      {/* {formatTime(time)} */}

      {/* <HStack spacing={10} childrenRenderMode="clone"> */}
        <ClockCustomeButton
            appearance={"ghost"}
            formatTime={formatTime}
            time={time}
            toggleTimeFormat={toggleTimeFormat}
          />
        {/* <HStack spacing={15}>
          <div style={{ width: "360px !important" }}>
            {kyc_status === "N" ? (
              <div>
                <HStack>
                  <Input
                    size="sm"
                    style={{ padding: "5px" }}
                    
                    leftSection={<IconSearch size={16} />}
                    rightSection={<SpotlightSearch />}
                  />
                  <div dir="ltr">
                    <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
                  </div>
                </HStack>
              </div>
            ) : (
              <p className="float-left">
                <i className="fa fa-info-circle"></i> Your account is pending
                activation. Please submit your documents to payuguru.com
              </p>
            )}
          </div>
        </HStack> */}
        {/* <HStack>
          <ClockCustomeButton
            appearance={"ghost"}
            formatTime={formatTime}
            time={time}
            toggleTimeFormat={toggleTimeFormat}
          />
        </HStack> */}
      {/* </HStack> */}
      {/* <HStack  spacing={10} childrenRenderMode="clone">
               h
              
              </HStack > */}
    </div>
  );
};

export default Clock;
