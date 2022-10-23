import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiDatabase,
} from "@mdi/js";

export default [
  // {
  //   to: "/",
  //   icon: mdiMonitor,
  //   label: "Dashboard",
  // },
  {
    to: "/",
    label: "My SalePage",
    icon: mdiDatabase,
  },
  {
    to: "/products",
    label: "My Product",
    icon: mdiViewList,
  },
  {
    to: "/orders",
    label: "My Order",
    icon: mdiTable,
  },
  {
    to: "/create-site",
    label: "Create Site",
    icon: mdiSquareEditOutline,
  },
  // {
  //   to: "/ui",
  //   label: "UI",
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   to: "/responsive",
  //   label: "Responsive",
  //   icon: mdiResponsive,
  // },
  // {
  //   to: "/profile",
  //   label: "Profile",
  //   icon: mdiAccountCircle,
  // },
  // {
  //   to: "/login",
  //   label: "Login",
  //   icon: mdiLock,
  // },
  // {
  //   to: "/error",
  //   label: "Error",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: "Dropdown",
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: "Item One",
  //     },
  //     {
  //       label: "Item Two",
  //     },
  //   ],
  // },
];
