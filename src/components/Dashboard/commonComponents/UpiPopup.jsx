import React from "react";
import CopyButtonIcon from "./CopyButtonIcon";
import QRCodeButton from "./QRCodeIcon";
import { Link } from "react-router-dom";

import {
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

  const handleCopy = () => {
    navigator.clipboard.writeText(data.upi_id);
    alert("UPI ID copied to clipboard!");
  };
  

  return (
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
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: 768, cols: 2, spacing: "md" },
            { maxWidth: 480, cols: 1, spacing: "sm" },
          ]}
        >
          <UnstyledButton className={classes.item} onClick={handleCopy}>
            <IconCreditCard size={32} color={theme.colors.blue[6]} />
            <Text size="xs" mt={7}>
              Copy UPI ID
            </Text>
          </UnstyledButton>
          <UnstyledButton className={classes.item}>
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
  );
};

export default UpiPopup;
