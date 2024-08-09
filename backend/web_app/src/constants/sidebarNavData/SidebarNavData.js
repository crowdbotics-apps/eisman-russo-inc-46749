import { ReactComponent as DashboardIcon } from "../../assets/rawSvg/sidebarNavIcons/dashboardIcon.svg";
import { ReactComponent as AdministrationIcon } from "../../assets/rawSvg/sidebarNavIcons/administrationIcon.svg";
import { ReactComponent as EventManagementIcon } from "../../assets/rawSvg/sidebarNavIcons/eventManagementIcon.svg";
import { ReactComponent as ProjectManagementIcon } from "../../assets/rawSvg/sidebarNavIcons/projectManagementIcon.svg";
import { ReactComponent as UserManagementIcon } from "../../assets/rawSvg/sidebarNavIcons/userManagementIcon.svg";
import { ReactComponent as TicketManagementIcon } from "../../assets/rawSvg/sidebarNavIcons/ticketManagementIcon.svg";
import { ReactComponent as ContractorManagementIcon } from "../../assets/rawSvg/sidebarNavIcons/contractorManagementIcon.svg";
import { ReactComponent as TruckManagementIcon } from "../../assets/rawSvg/sidebarNavIcons/truckManagementIcon.svg";
import { ReactComponent as DisposalTruckIcon } from "../../assets/rawSvg/sidebarNavIcons/disposalTruckIcon.svg";
import { ReactComponent as MapIcon } from "../../assets/rawSvg/sidebarNavIcons/mapIcon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/rawSvg/sidebarNavIcons/settingsIcon.svg";
import { ReactComponent as TreeIcon } from "../../assets/rawSvg/sidebarNavIcons/tree.svg";

export const adminSidebarNavData = [
  {
    itemList: [
      {
        itemName: "Dashboard",
        itemIcon: <DashboardIcon/>,
        navigateTo: "/dashboard",
        active: true,
      },
      {
        itemName: "Administration",
        itemIcon: <AdministrationIcon/>,
        navigateTo: "/administration",
      },
      {
        itemName: "Event Management",
        itemIcon: <EventManagementIcon/>,
        navigateTo: "/event-management",
      },
      {
        itemName: "Project Management",
        itemIcon: <ProjectManagementIcon/>,
        navigateTo: "/project-management",
        children: [
          {
            itemName: "Manage Project",
            navigateTo: "/project-management/manage-project",
          },
          {
            itemName: "Map User",
            navigateTo: "/project-management/map-user",
          },
        ],
      },
      {
        itemName: "User Management",
        itemIcon: <UserManagementIcon/>,
        navigateTo: "/user-management",
      },
      {
        itemName: "Disposal Site",
        itemIcon: <DisposalTruckIcon/>,
        navigateTo: "/disposal-site",
      },
      {
        itemName: "Ticket Management",
        itemIcon: <TicketManagementIcon/>,
        navigateTo: "/ticket-management",
      },
      {
        itemName: "Contractor Management",
        itemIcon: <ContractorManagementIcon/>,
        navigateTo: "/contractor-management",
        children: [
          {
            itemName: "Manage Contractors",
            navigateTo: "/contractor-management/manage-contractors",
          },
          {
            itemName: "Manage Rate Matrix",
            navigateTo: "/contractor-management/manage-rate-matrix",
          },
        ],
      },
      {
        itemName: "Truck Management",
        itemIcon: <TruckManagementIcon/>,
        navigateTo: "/truck-management",
      },
      {
        itemName: "Map",
        itemIcon: <MapIcon/>,
        navigateTo: "/map",
      },
      // {
      //   itemName: "Settings",
      //   itemIcon: <SettingsIcon/>,
      //   navigateTo: "/settings",
      // },
    ],
  },
];
