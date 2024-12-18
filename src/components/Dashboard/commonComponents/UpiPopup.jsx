import React, {useEffect, useState} from "react";
import CopyButtonIcon from "./CopyButtonIcon";
import QRCodeButton from "./QRCodeIcon";
import UpiModal from "./UpiModel";
import { ENDPOINTS } from "../../../utils/apiConfig";
import { Link } from "react-router-dom";

import {
  Anchor,
  Modal,
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
  Button,
} from "@mantine/core";
import {
  IconBuildingBank,
  IconCashBanknote,
  IconCoin,
  IconCreditCard,
  IconReceipt,
  IconReceiptRefund,
  IconReceiptTax,
  IconRepeat,
  IconReport,
} from "@tabler/icons-react";
import classes from "./ActionsGrid.module.css";

const UpiPopup = ({ data, onClose, opened }) => {
  const theme = useMantineTheme();
  var dataSource = data;
  console.log('Data of upi ', dataSource);
    const [popupData, setPopupData] = useState(null);
  
    const [modalOpened, setModalOpened] = useState(false);
    const [qrCodeURL, setQrCodeURL] = useState("");
    const [upiID, setUpiID] = useState("");
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sessionid = sessionStorage.getItem("sessionid");
    const get_upi = ENDPOINTS.SEARCH_UPI_ID;
  // const [upiID, setUpiID] = useState(dataSource.upi_id);
  const handleCopy = () => {
    console.log("upi id copy: ", data.upi_id)
    navigator.clipboard.writeText(data.upi_id);
    alert("UPI ID copied to clipboard!");
  };

  useEffect(() => {
  if(data != null && opened){
    // setUpiID(dataSource.upi_id);
  }
  else{
    // setUpiID("")
  }
}, []);


  

const mockdata = [
  { title: 'QR Code', icon: QRCodeButton, path:"",  color: 'pink' },
  // { title: 'Banks nearby', icon: IconBuildingBank,  path:"", color: 'indigo' },
  // { title: 'Transfers', icon: IconRepeat,  path:"", color: 'blue' },
  { title: 'Refunds', icon: IconReceiptRefund,  path:"", color: 'green' },
  { title: 'Transactions', icon: IconReceipt,  path:"", color: 'teal' },
  { title: 'Fess & Charges', icon: IconReceiptTax,  path:"", color: 'cyan' },
  { title: 'Reports', icon: IconReport,  path:"", color: 'pink' },
  { title: 'Payments', icon: IconCoin,  path:"", color: 'red' },
  { title: 'Payment Collect', icon: IconCashBanknote,  path:"/paymentCollect", color: 'orange' },
];
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

const items = mockdata.map((item) => (
  <UnstyledButton key={item.title} className={classes.item}>
     {item.title ==="QR Code" ?
      <QRCodeButton
      data={data && data.upi_id ? `${data.upi_id}` : "No UPI ID available"}
      openModal={Show_UPI_id}
      style={{ backgroundColor: "#f8dcdc !important" }}
    /> :<item.icon color={theme.colors[item.color][6]} size={32} />}
    <Link to={item.path} >
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </Link>
  </UnstyledButton>
));



const handleModalClose = () => {
  setIsModalOpen(false);
};


  return (
    <>
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      // overlayProps={{
      //   blur: 3,
      //   color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
      // }}
      withCloseButton={false} // Removes the close button in the modal header
    >
      <Card withBorder radius="md" p="lg" shadow="sm" style={{ maxWidth: 600, margin: "auto" }}>
      <Group justify="space-between">
      <Text className={classes.title}>
        {/* UPI id: {upiID}   */}
        {data && data.upi_id ? `UPI ID: ${data.upi_id}` : "No UPI ID available"} 
        </Text>               <CopyButtonIcon
              data={data && data.upi_id ? `UPI ID: ${data.upi_id}` : "No UPI ID available"}
              style={{ backgroundColor: 'var(--heading-color) !important'}}
            />
        <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
          + 2 other services
        </Anchor>
        </Group>
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: 768, cols: 2, spacing: "md" },
            { maxWidth: 480, cols: 1, spacing: "sm" },
          ]}
        >
          {/* <UnstyledButton className={classes.item} onClick={handleCopy}>
            <IconCreditCard size={32} color={theme.colors.blue[6]} />
            <Text size="xs" mt={7}>
              Copy UPI ID
            </Text>
          </UnstyledButton> */}
          {/* <UnstyledButton className={classes.item}>
            <IconReport size={32} color={theme.colors.red[6]} />
            <Link to="/paymentCollect" >
              <Text size="xs" mt={7}>
                Payment Collect
              </Text>
            </Link>
            
          </UnstyledButton>
          <UnstyledButton className={classes.item}>
            <IconReceipt size={32} color={theme.colors.green[6]} />
            <Text size="xs" mt={7}>
              Statement
            </Text>
          </UnstyledButton>
          <UnstyledButton className={classes.item}>
            <IconReceiptRefund size={32} color={theme.colors.orange[6]} />
            <Text size="xs" mt={7}>
              Invoice
            </Text>
          </UnstyledButton>
          <UnstyledButton className={classes.item}>
            <IconCashBanknote size={32} color={theme.colors.teal[6]} />
            <Text size="xs" mt={7}>
              Balance
            </Text>
          </UnstyledButton>
          <UnstyledButton className={classes.item}>
            <IconCoin size={32} color={theme.colors.yellow[6]} />
            <Text size="xs" mt={7}>
              Revenue
            </Text>
          </UnstyledButton>
          <UnstyledButton className={classes.item}>
            <IconCoin size={32} color={theme.colors.yellow[6]} />
            <Text size="xs" mt={7} mb={7}>
              More +
            </Text>
          </UnstyledButton> */}
          {items}
        </SimpleGrid>
      </Card>

      <Button
        variant="outline"
        fullWidth
        mt="lg"
        size="md"
        onClick={onClose}
      >
        Close
      </Button>
    </Modal>
    <UpiModal
        upiID={upiID}
        qrCodeURL={qrCodeURL}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
      </>
  );
};

export default UpiPopup;
