import React, { useState, useRef, useEffect } from 'react';
import { Modal, Center, Card, Image, Button, Group, ActionIcon } from '@mantine/core';
import { IconShare, IconDownload, IconX } from '@tabler/icons-react';
import CopyButtonIcon from './CopyButtonIcon';
import html2canvas from 'html2canvas';

const UpiModal = ({ upiID, qrCodeURL, isOpen, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const canvasRef = useRef(null);
  const qrCardRef = useRef(null);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Download the styled canvas as a PNG
  const handleDownload = async () => {
    if (qrCardRef.current) {
      try {
        // Use html2canvas to capture the styled component
        const canvas = await html2canvas(qrCardRef.current, { backgroundColor: null });
        const dataURL = canvas.toDataURL('image/png');

        // Create a download link and trigger download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'upi_qr_code_sticker.png';
        link.click();
      } catch (error) {
        console.error('Error capturing or downloading the QR code:', error);
      }
    }
  };

  const handleShare = async () => {
    try {
      const imageBlob = await fetch(qrCodeURL).then(res => res.blob());
      const imageUrl = URL.createObjectURL(imageBlob);

      if (navigator.share) {
        navigator
          .share({
            title: 'UPI QR Code',
            text: `Here's my UPI ID: ${upiID}. Scan the QR code to pay.`,
            files: [new File([imageBlob], 'upi_qr_code.png', { type: imageBlob.type })],
            url: imageUrl,
          })
          .then(() => console.log('Successfully shared'))
          .catch((error) => console.error('Error sharing:', error));
      } else {
        console.error('Web Share API is not supported in your browser.');
      }
    } catch (error) {
      console.error('Error fetching QR code image:', error);
    }
  };

  const loadQRCodeOntoCanvas = () => {
    if (canvasRef.current && qrCodeURL) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Set canvas dimensions
        canvas.width = 800; // Adjust as needed
        canvas.height = 600; // Adjust as needed

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the QR code centered on the canvas
        const qrCodeSize = Math.min(canvas.width, canvas.height) * 0.7; // 70% of the smallest dimension
        const qrCodeX = (canvas.width - qrCodeSize) / 2;
        const qrCodeY = (canvas.height - qrCodeSize) / 2;

        ctx.drawImage(img, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

        // Add UPI ID below the QR code
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        ctx.fillText(upiID, canvas.width / 2, qrCodeY + qrCodeSize + 40); // Adjust the Y position to be below the QR code
      };

      img.src = qrCodeURL;
    }
  };

  useEffect(() => {
    loadQRCodeOntoCanvas();
  }, [qrCodeURL]);

  if (!isOpen) return null;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Qr Code"
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      size="md"
      withCloseButton={false}
    >
      <Card shadow="md" radius="md" withBorder>
        <Center>
          <h6>Your UPI ID</h6>
        </Center>
        <Center>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h6 id="upi_id" style={{ marginRight: '8px' }}>{upiID}</h6>
            <CopyButtonIcon
              data={upiID}
              style={{ backgroundColor: 'var(--heading-color) !important' }}
            />
          </div>
        </Center>

        {/* QR Code Image */}
        <Center mt="lg">
          {!isImageLoaded && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <Image
            src={qrCodeURL}
            alt="UPI QR Code"
            radius="md"
            withPlaceholder={!isImageLoaded}
            onLoad={handleImageLoad}
            style={{
              width: '200px',
              height: '200px',
              border: '1px solid #e0e0e0',
              display: isImageLoaded ? 'block' : 'none',
            }}
          />
        </Center>

        {/* Share and Download Buttons */}
        <Center mt="lg">
          <Group position="center">
            <ActionIcon color="blue" onClick={handleShare} disabled={!navigator.share}>
              <IconShare size={24} />
            </ActionIcon>
            <ActionIcon color="gray" onClick={handleDownload}>
              <IconDownload size={24} />
            </ActionIcon>
          </Group>
        </Center>

        {/* Hidden div for styled QR Code and UPI ID */}
        <div
          ref={qrCardRef}
          style={{
            display: 'none', // Initially hidden for capturing
            width: '4in', // 4:6 ratio in inches
            height: '6in',
            padding: '20px',
            border: '2px solid #000', // Black border for branding
            borderRadius: '10px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9', // Light background for better branding
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for better visual effect
          }}
        >
          <canvas
            ref={canvasRef}
            width={800} // Adjust width for capture
            height={600} // Adjust height for capture
            style={{ border: '1px solid #e0e0e0', borderRadius: '5px', marginBottom: '10px' }}
          />
          <div style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            <h6>{upiID}</h6>
          </div>
        </div>

        <Center mt="lg">
          <Button variant="outline" onClick={onClose} leftIcon={<IconX size={16} />}>
            Close
          </Button>
        </Center>
      </Card>
    </Modal>
  );
};

export default UpiModal;
