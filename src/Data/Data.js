// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";
  
  // Analytics Cards imports
  import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
  // import { keyboard } from "@testing-library/user-event/dist/keyboard";
  
  // Recent Card Imports
  import img1 from "../imgs/img1.png";
  import img2 from "../imgs/img2.png";
  import img3 from "../imgs/img3.png";
  
  // Sidebar Data
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
    },
    {
      icon: UilClipboardAlt,
      heading: "Orders",
    },
    {
      icon: UilUsersAlt,
      heading: "Customers",
    },
    {
      icon: UilPackage,
      heading: 'Products'
    },
    {
      icon: UilChart,
      heading: 'Analytics'
    },
  ];
  
  // Analytics Cards Data
  export const cardsData = [
    {
      title: "Today Transactions",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px rgba(224, 198, 245, 0.3)",
      },
      barValue: 70,
      value: "00",
      png: UilUsdSquare,
      series: [
        {
          name: "Today Transactions",
          data: [0,0,0,0,0],
        },
      ],
    },
    {
      title: "Today Collections",
      color: {
        backGround: "linear-gradient(180deg,#fca61f 0%,rgb(248, 189, 80) 100%)",
        boxShadow: "0px 10px 20px 0px rgba(255, 147, 46, 0.3)",
      },
      barValue: 80,
      value: "00",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Today Collections",
          data: [0,0,0,0,0],
        },
      ],
    },
    {
      title: "Failed/Pending",
      color: {
        backGround:
          "linear-gradient(rgb(255, 73, 73) -146.42%, rgb(255 73 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px rgba(249, 213, 155, 0.3)",
      },
      barValue: 60,
      value: "00",
      png: UilClipboardAlt,
      series: [
        {
          name: "Failed/Pending",
          data: [0,0,0,0,0],
        },
      ],
    },
  ];
  
  // Recent Update Card Data
  export const UpdatesData = [
    {
      // img: img1,
      img: "https://i.postimg.cc/k4vnxyNq/one-svgrepo-com.png",
      name: "1. Step",
      noti: "Account Api Check Live At Setting Profile",
      time: "",
    },
    {
      // img: img2,
      img: "https://i.postimg.cc/7Zb7L53K/two-svgrepo-com.png",
      name: "2. Step",
      noti: "Copy Your Secrets Keys From Account Setting Tab",
      time: "",
    },
    {
      // img: img3,
      img: "https://i.postimg.cc/CxHyzKwf/three-svgrepo-com.png",
      name: "3. Step",
      noti: "Add Your Secret Keys in your as Env.  Variable",
      time: "",
    },
  ];