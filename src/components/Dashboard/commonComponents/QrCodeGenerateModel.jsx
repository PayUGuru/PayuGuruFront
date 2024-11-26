import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Modal, TextInput, Select, Button } from '@mantine/core';

export function QrCodeGenerateModel({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    merchantName: '',
    paymentType: 'mobile',
    mobileNumber: '',
    amount: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle QR code generation logic here
  };

  return (
    <Modal 
      opened={isOpen} 
      onClose={onClose}
      title="Generate Payment QR Code"
      size="lg"
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <TextInput
            label="Merchant / Payee Name"
            value={formData.merchantName}
            onChange={(e) => setFormData({ ...formData, merchantName: e.target.value })}
            required
          />
          
          <Select
            label="Payment Address Type"
            value={formData.paymentType}
            onChange={(value) => setFormData({ ...formData, paymentType: value || 'mobile' })}
            data={[
              { value: 'mobile', label: 'Mobile Number' },
              { value: 'upi', label: 'UPI ID' }
            ]}
          />
          
          <TextInput
            label="Mobile Number"
            value={formData.mobileNumber}
            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            required
          />
          
          <TextInput
            label="Transaction Amount (₹)"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            type="number"
            required
          />
          
          <TextInput
            label="Description (Notes)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter transaction description here..."
          />
          
          <Button 
            fullWidth 
            color="blue"
            onClick={handleSubmit}
          >
            Download QR Code
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">{formData.merchantName || 'MERCHANT NAME'}</h2>
          <QRCodeSVG 
            value={`upi://pay?pa=${formData.mobileNumber}@upi&pn=${formData.merchantName}&am=${formData.amount}&tn=${formData.description}`}
            size={200}
          />
          <p className="mt-4 text-sm text-gray-600">{formData.mobileNumber}@upi</p>
          <p className="mt-2 text-sm font-medium">Scan and pay with any BHIM UPI app</p>
          
          <div className="flex gap-4 mt-4">
            <img src="/bhim-logo.png" alt="BHIM" className="h-8" />
            <img src="/upi-logo.png" alt="UPI" className="h-8" />
          </div>
        </div>
      </div>
    </Modal>
  );
}
