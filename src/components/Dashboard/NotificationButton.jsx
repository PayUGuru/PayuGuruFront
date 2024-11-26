// import {
//     Dropdown,
//     Popover,
//     Whisper,
//     WhisperInstance,
//     Stack,
//     Badge,
//     Avatar,
//     IconButton,
//     List,
//     Button,
//     VStack
//   } from 'rsuite';
//   import NoticeIcon from '@rsuite/icons/Notice';

// import 'rsuite/Button/styles/index.css';
// import 'rsuite/ButtonGroup/styles/index.css';
// import 'rsuite/ButtonToolbar/styles/index.css';
// import 'rsuite/IconButton/styles/index.css';
// import 'rsuite/List/styles/index.css';
// import 'rsuite/Badge/styles/index.css';
// import 'rsuite/Dropdown/styles/index.css';
// // (Optional) Import component styles. If you are using Less, import the `index.less` file. 
// import 'rsuite/IconButton/styles/index.css';
// import 'rsuite/Stack/styles/index.css';
// import 'rsuite/Popover/styles/index.css';
// // (Optional) Import component styles. If you are using Less, import the `index.less` file. 
// import 'rsuite/Badge/styles/index.css';
// import { useRef } from 'react';
// import { PiTruckTrailer } from 'react-icons/pi';



// import { overflow } from 'html2canvas/dist/types/css/property-descriptors/overflow';

// const renderNoticeSpeaker = ({ onClose, left, top, className }, ref) => {
//     const notifications = [
//       [
//         '7 hours ago',
//         '₹ 100.00 rupees received from payu.xyz19393@dbs Ref: yNiueo934noiv TrsId: 8934u349k43jdc8934.'
//       ],
//       [
//         '13 hours ago',
//         'Received ₹ 10890.00 Through RTGS/NEFT from AC: 129394048381039239 IFSC: BOI0003283 TrsId: 8934u34qw9kjdc8934'
//       ],
//       ['2 days ago', 'Today ₹ 150000 settled in your AC: 45000037273282 IFSC: IND8394893 Ref: i023nif93bfje3 TrsId: 8934u349kjdc8934'],
//       [
//         '3 days ago',
//         'your KYC is completed.'
//       ],
//       [
//         '3 days ago',
//         'your KYC is Processing.'
//       ],
//       [
//         '3 days ago',
//         'your Profile is updated.'
//       ]
//     ];
  
//     return (
//       <Popover ref={ref} className={className} style={{ left, top, width: 300 }} title="Last updates">
//        <VStack style={{height: 480}}>
//        <List>
//           {notifications.map((item, index) => {
//             const [time, content] = item;
//             // <ul style={{ overflowY: true, overflowX: false,}}>
//               return (
//               <List.Item key={index}>
//               {/* <li> */}
//               <Stack spacing={4}>
//                   <Badge /> <span style={{ color: '#57606a' }}>{time}</span>
//                 </Stack>
  
//                 <p className='notice-text'>{content}</p>
//               {/* </li> */}
//               </List.Item>
//             );
//             // </ul>
//           })}
//         </List>
//         <div style={{ textAlign: 'center', marginTop: 20 }}>
//           <Button onClick={onClose}>More notifications</Button>
//         </div>
//        </VStack>
//       </Popover>
//     );
//   };
  



// const NotificationButton = () => {

// const trigger = useRef(null);

//     return (
//       <Stack className="header" spacing={8}>

//       <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderNoticeSpeaker}>
//               <IconButton onClick={renderNoticeSpeaker}
//               icon={
//                   <Badge content={5}>
//                   <NoticeIcon animation='pulse' style={{ fontSize: 20 }} className='notice-text' />
//                   </Badge>
//               }
//               />
//           </Whisper>
//       </Stack>
//     )
// };




import { Menu, Text, UnstyledButton } from '@mantine/core';
import { Bell, CheckCircle, XCircle, AlertCircle, Gift } from 'lucide-react';

const getNotificationIcon = (type) => {
  const iconMap = {
    payment: <CheckCircle className="text-green-500" size={20} />,
    failed: <XCircle className="text-red-500" size={20} />,
    settlement: <CheckCircle className="text-blue-500" size={20} />,
    news: <AlertCircle className="text-yellow-500" size={20} />,
    promo: <Gift className="text-purple-500" size={20} />,
    default: <Bell className="text-gray-500" size={20} />
  };

  return iconMap[type] || iconMap.default;
};

const apiNotifications = [
  {
    id: 1,
    type: 'payment',
    title: 'Payment Received',
    message: 'Received ₹1,500 from John Doe',
    time: '2 minutes ago'
  },
  {
    id: 2,
    type: 'failed',
    title: 'Transaction Failed',
    message: 'Payment to Merchant XYZ failed',
    time: '5 minutes ago'
  },
  {
    id: 3,
    type: 'settlement',
    title: 'Account Settlement',
    message: 'Settlement of ₹5,000 completed',
    time: '1 hour ago'
  },
  {
    id: 4,
    type: 'news',
    title: 'System Update',
    message: 'New features available',
    time: '2 hours ago'
  },
  {
    id: 5,
    type: 'promo',
    title: 'Special Offer',
    message: 'Get 50% off on premium features',
    time: '1 day ago'
  }
];

// const notifications = [
//   {
//     id: 1,
//     type: 'payment',
//     title: 'Payment Received',
//     message: 'Received ₹1,500 from John Doe',
//     time: '2 minutes ago',
//     icon: <CheckCircle className="text-green-500" size={20} />
//   },
//   {
//     id: 2,
//     type: 'failed',
//     title: 'Transaction Failed',
//     message: 'Payment to Merchant XYZ failed',
//     time: '5 minutes ago',
//     icon: <XCircle className="text-red-500" size={20} />
//   },
//   {
//     id: 3,
//     type: 'settlement',
//     title: 'Account Settlement',
//     message: 'Settlement of ₹5,000 completed',
//     time: '1 hour ago',
//     icon: <CheckCircle className="text-blue-500" size={20} />
//   },
//   {
//     id: 4,
//     type: 'news',
//     title: 'System Update',
//     message: 'New features available',
//     time: '2 hours ago',
//     icon: <AlertCircle className="text-yellow-500" size={20} />
//   },
//   {
//     id: 5,
//     type: 'promo',
//     title: 'Special Offer',
//     message: 'Get 50% off on premium features',
//     time: '1 day ago',
//     icon: <Gift className="text-purple-500" size={20} />
//   }
// ];

// Add icons dynamically based on type
const notifications = apiNotifications.map((notification) => ({
  ...notification,
  icon: getNotificationIcon(notification.type)
}));
export function NotificationButton() {
  return (
    <div className= "h-theme">
      <Menu shadow="md" width={320} className="h-theme">
      {/* Button to open the notifications dropdown */}
      <Menu.Target>
        <UnstyledButton className="relative">
          <Bell size={24} className="text-gray-700" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-color text-xs flex items-center justify-center rounded-full animate-pulse">
            {notifications.length}
          </span>
        </UnstyledButton>
      </Menu.Target>

      {/* Notifications dropdown */}
      <Menu.Dropdown className="h-theme">
        <Menu.Label>Notifications</Menu.Label>
        {notifications.map((notification) => (
          <Menu.Item key={notification.id} leftSection={notification.icon}>
            <div>
              <Text size="sm" fw={500}>{notification.title}</Text>
              <Text size="xs" color="dimmed">{notification.message}</Text>
              <Text size="xs" color="dimmed" mt={4}>{notification.time}</Text>
            </div>
          </Menu.Item>
        ))}

        {/* View All Notifications */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <UnstyledButton>
            <Text size="sm" fw={500} color="blue">
              View All Notifications
            </Text>
          </UnstyledButton>
        </div>
      </Menu.Dropdown>
    </Menu>
    </div>
    
  );
}

export default NotificationButton;
