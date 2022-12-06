import {
  mdiAccountCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiDatabase,
  mdiAccount,
} from "@mdi/js";

import { useAuthStore } from "@/stores/auth.js";

const { type } = useAuthStore();

const userRoute = [
  {
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
  },
  {
    to: "/subscription",
    label: "Plan",
    icon: mdiTable,
  },

  {
    label: "Salepage",
    icon: mdiViewList,
    menu: [
      {
        to: "/salepage",
        label: "SalePage",
        icon: mdiDatabase,
      },
      {
        to: "/create-salepage",
        label: "Create",
        icon: mdiSquareEditOutline,
      },
    ],
  },
];

const adminRoute = [
  {
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
  },

  {
    to: "/salepage-approve",
    label: "Approve Plan",
    icon: mdiAccountCircle,
  },
  {
    label: "Manage Admin",
    icon: mdiViewList,
    menu: [
      {
        to: "/admin-create",
        label: "Add Admin",
        icon: mdiAccount,
      },
      {
        to: "/admin-update",
        label: "Edit Admin",
        icon: mdiAccount,
      },
    ],
  },
  {
    label: "Manage Salepage , User",
    icon: mdiViewList,
    menu: [
      {
        to: "/salpage-manage",
        label: "Salepage",
        icon: mdiAccount,
      },
      {
        to: "/user-manage",
        label: "User",
        icon: mdiAccount,
      },
    ],
  },
];

export default type === "1" ? adminRoute : userRoute;
