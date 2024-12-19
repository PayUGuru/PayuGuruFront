import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Tabs, Button, TextInput, Textarea, Card, Group,Grid, Radio } from "@mantine/core";
import {HStack} from "rsuite"
import { motion } from "framer-motion";// Updated import
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import Dheader from "../Dheader";
import Dfooter from "../Dfooter";
import { useTheme } from "../theme-context";
import './PaymentCollect.css'

const PaymentCollect = () => {
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [currentInput, setCurrentInput] = useState("0");
  const [paymentType, setPaymentType] = useState("Static");

  // Handlers for various actions
  const handleClear = () => setCurrentInput("0");
  const handleBackspace = () => setCurrentInput((prev) => prev.slice(0, -1) || "0");
  const handlePercentage = () => setCurrentInput((prev) => String(Number(prev) / 100));
  const handlePercentageDeduction = () =>
    setCurrentInput((prev) => String(Number(prev) - Number(prev) / 100));
  const handleInput = (value) =>
    setCurrentInput((prev) => (prev === "0" ? value : prev + value));
  const handleCalculate = () => {
    try {
      setCurrentInput(String(eval(currentInput))); // Consider replacing `eval` for security
    } catch {
      setCurrentInput("Error");
    }
  };

  // Mapping keys to their respective handlers
  const keyActions = {
    AC: handleClear,
    "🡨": handleBackspace,
    "%": handlePercentage,
    "%–": handlePercentageDeduction,
    "=": handleCalculate,
  };

  // Render buttons dynamically
  const renderButtons = (keys , style) =>
    keys.map((key, idx) => (
      <Button
        key={idx}
        onClick={() => (keyActions[key] ? keyActions[key]() : handleInput(key))}
        aria-label={key}
        variant="light"
        color={style === "gray" ? "gray" : "orange"}
        fullWidth
      >
        {key}
      </Button>
    ));

  const generateQRCode = () => {
    if (currentInput && description) {
      const qrData = `upi://pay?pa=payuguru@dbs&pn=Arena%20ITech%20Private%20Limited&am=${amount}&cu=INR&tn=${description}`;
      // https://quickchart.io/qr?text=upi://pay?pa=payuguru@dbs&pn=Arena%20ITech%20Private%20Limited&cu=INR&ecLevel=M&margin=2&size=350&centerImageUrl=https://demo.payu.guru/favicon_512.png
      setQrCodeData(qrData);
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className={`page ${theme}`}>
      <div className="wrapper">
        <Dheader />
        <div className="main-content">
          <div className="top bg-white mt-0 p-2">
            <DashboardTopbar />
          </div>

          <div className="row mb-3">
            <div className="col-lg-12 col-md-12 col-12">
               {/*<div className="card pb-0 account-details border-0 shadow-lg">
                <h4 className="bg-transparent mt-0 p-3 h-theme mb-0">Payment Collect</h4>
                <div className="card-body p-3"> */}
                  {/* Row for form and QR code */}
                  {/* <div className="row"> */}
                    {/* Form Section */}
                    {/* <div className="col-lg-6 col-sm-12">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="amount" className="form-label">
                            Transaction Amount
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Description (Notes)
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            placeholder="Enter transaction description here"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={generateQRCode}
                        >
                          Generate QR Code
                        </button>
                      </form>
                    </div> */}

                    {/* QR Code Section */}
                    {/* <div className="col-lg-6 col-sm-12 d-flex justify-content-center mt-3">
                        <div className="card">
                            <div className="card-body">
                            {qrCodeData ? (
                                <QRCodeCanvas value={qrCodeData} size={200} /> // Updated to QRCodeCanvas
                            ) : (
                                <p className="text-muted">QR Code will appear here</p>
                            )}
                            </div>
                        </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
{/* <Tabs defaultValue="calculator" orientation="horizontal" styles={{ tab: { flexGrow: 1 } }}> */}
  {/* Calculator Tab */}
  {/* <Tabs.Tab value="calculator" label="Calculator"> */}
  <HStack>

 
  <div className="col-12 col-lg-6 col-md-8 col-sm-12">

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ maxWidth: 400, margin: "auto" }} className="calculator-container">
          <div className="calculator-display">
            <TextInput value={currentInput} readOnly
              variant="unstyled"
              size="xl"
              style={{ textAlign: "right", fontSize: "1.5rem", color: "#333" }} />
          </div>
          {/* Buttons */}
          {/* <div className="calculator-buttons"> */}
          <Grid gutter="xs" justify="center">
            {/* First row */}
            <Grid.Col span={3}>{renderButtons(["AC"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["🡨"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["%"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["%–"], "gray")}</Grid.Col>

            {/* Second row */}
            <Grid.Col span={3}>{renderButtons(["7"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["8"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["9"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["/"], "orange")}</Grid.Col>

            {/* Third row */}
            <Grid.Col span={3}>{renderButtons(["4"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["5"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["6"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["*"], "orange")}</Grid.Col>

            {/* Fourth row */}
            <Grid.Col span={3}>{renderButtons(["1"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["2"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["3"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["-"], "orange")}</Grid.Col>

            {/* Fifth row */}
            <Grid.Col span={3}>{renderButtons(["0"], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["."], "gray")}</Grid.Col>
            <Grid.Col span={3}>{renderButtons(["+"], "orange")}</Grid.Col>
            <Grid.Col span={3}>
              <Button
                onClick={handleCalculate}
                aria-label="="
                variant="filled"
                color="orange"
                fullWidth
              >
                =
              </Button>
            </Grid.Col>
          </Grid>
          {/* </div> */}
        </Card>

    </motion.div>
  </div>

  {/* </Tabs.Tab> */}

  {/* QR Code Generator Tab */}
  {/* <Tabs.Tab value="generate-qr" label="Generate QR"> */}
  <div className="col-12 col-lg-4 col-md-4 col-sm-12">
        <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card shadow="sm" p="lg" radius="md" withBorder>
        {/* <TextInput
          label="Transaction Amount"
          value={currentInput}
          readOnly
          variant="filled"
        /> */}
        <div className="qr-code-display" style={{ textAlign: "center", marginTop: "1rem" }}>
          {qrCodeData ? (
            <QRCodeCanvas value={qrCodeData} size={200} />
          ) : (
            <p className="text-muted">QR Code will appear here</p>
          )}
        </div>
        <Textarea
          label="Description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mt="sm"
        />
        <Radio.Group
          value={paymentType}
          onChange={setPaymentType}
          mt="sm"
          label="Payment Type"
        >
          <Radio value="Static" label="Static" />
          <Radio value="Dynamic" label="Dynamic" />
        </Radio.Group>
        <Button
          fullWidth
          mt="sm"
          onClick={() => {
            setAmount(currentInput); // Set the amount from currentInput
            generateQRCode();
          }}
        >
          Generate QR Code
        </Button>
 
      </Card>
    </motion.div>
    </div>
    </HStack>
  {/* </Tabs.Tab>  */}
{/* </Tabs> */}
</div>
</div>
          <Dfooter />
        </div>
      </div>
    </div>
  );
};

export default PaymentCollect;
