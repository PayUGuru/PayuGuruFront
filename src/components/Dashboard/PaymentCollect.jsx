import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Updated import
import DashboardTopbar from "./commonComponents/DashboardTopbar";
import Dheader from "../Dheader";
import Dfooter from "../Dfooter";
import { useTheme } from "../theme-context";

const PaymentCollect = () => {
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");

  const generateQRCode = () => {
    if (amount && description) {
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
              <div className="card pb-0 account-details border-0 shadow-lg">
                <h4 className="bg-transparent mt-0 p-3 h-theme mb-0">Payment Collect</h4>
                <div className="card-body p-3">
                  {/* Row for form and QR code */}
                  <div className="row">
                    {/* Form Section */}
                    <div className="col-lg-6 col-sm-12">
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
                    </div>

                    {/* QR Code Section */}
                    <div className="col-lg-6 col-sm-12 d-flex justify-content-center mt-3">
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
          </div>

          <Dfooter />
        </div>
      </div>
    </div>
  );
};

export default PaymentCollect;
