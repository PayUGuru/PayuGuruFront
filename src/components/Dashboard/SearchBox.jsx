import React from 'react'
import { HStack } from "rsuite";
import { IconSearch } from "@tabler/icons-react";
import { Kbd } from "@mantine/core";
import "rsuite/Stack/styles/index.css";
import "rsuite/IconButton/styles/index.css";

import SpotlightSearch from "./commonComponents/Spotlight";
import { Input } from "@mantine/core";

const SearchBox = () => {
    const kyc_status = sessionStorage.getItem("kyc_status");


  return (
      <div className='customsearch'>
          {/* <HStack spacing={15}> */}
          <div>
            {kyc_status === "Y" ? (
              <div className='pt-1'>
                <HStack>
                  <Input
                    size="sm"
                    style={{ padding: "5px" }}
                    //  placeholder="Search..."
                    //  icon={<IconSearch size={16} />
                    leftSection={<IconSearch size={16} />}
                    rightSection={<SpotlightSearch />}
                  />
                  <div dir="ltr" className='d-none d-lg-block'>
                    <div className='d-flex'>
                    <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
                    </div>
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
          {/* <Toggle size="sm"   onChange={toggleTimeFormat}></Toggle> */}
        {/* </HStack> */}
      </div>
  )
}

export default SearchBox