// dashboardData.tsx

// Simulated data for now, later to be replaced with API calls
import {
  CompletedHairStyleIcon,
  DashboardHeartIcon,
  DashboardUsersIcon,
  ProjectIncomeIcon
} from "@/components/utilis/Icons";
import React from "react";

// types.ts
export interface OverviewDataItem {
  numbers: string;
  text: string;
  gradient: string;
  borderClr: string;
  icon: JSX.Element;
}


export const overviewData: OverviewDataItem[] = [
  {
    numbers: "98,420",
    text: "Revenue projetés",
    gradient: "bg-gradient-to-t from-red-700 via-red-500 to-red-500",
    borderClr: "bg-[#FE5352]",
    icon: <ProjectIncomeIcon/>,
  },
  {
    numbers: "325",
    text: "Nouveaux clients",
    gradient: "bg-gradient-to-b from-blue-400 to-blue-600",
    borderClr: "bg-[#15BAF2]",
    icon: <DashboardUsersIcon/>,
  },
  {
    numbers: "3,567",
    text: "Coiffures effectuées",
    gradient: "bg-gradient-to-b from-[#7ABF50] to-[#629E3E]",
    borderClr: "bg-[#7ABF50]",
    icon: <CompletedHairStyleIcon/>,
  },
  {
    numbers: "4,7/5",
    text: "",
    gradient: "bg-gradient-to-b from-[#FF266A] to-[#DE235E]",
    borderClr: "bg-[#FF266A]",
    icon: <DashboardHeartIcon/>,
  },
];

export const messagesData = [
  {
    name: "Nina jones",
    time: "5 minutes ago",
    text: "Hey You! it’s me again :) I attached new (...)",
  },
  { name: "Robert", time: "5 minutes ago", text: "Hey You!" },
];

export const activityData = [
  {
    user: "Angelina vitale",
    visities: "287",
    purchases: "34",
    calls: "52",
    profit: "5924",
  },
  {
    user: "Amanda louis",
    visities: "189",
    purchases: "32",
    calls: "30",
    profit: "4456",
  },
];

export const activityClientData = [
  {
    user: "Angelina vitale",
    Date: "12/07/2023",
    Status: "En cours",
  },
  {
    user: "Amanda louis",
    Date: "12/07/2023",
    Status: "Effectuée",
  },
  {
    user: "Amanda louis",
    Date: "12/07/2023",
    Status: "Demande de remboursement",
  },
  {
    user: "Amanda louis",
    Date: "12/07/2023",
    Status: "Remboursé(e)",
  },
];

export const TopClientData = [
  {
    Utilisateur: "Angelina",
    Date: "plongeant",
    Status: "89",
  },
  {
    Utilisateur: "Doppler",
    Date: "plongeant",
    Status: "77",
  },
  {
    Utilisateur: "louis",
    Date: "Carré",
    Status: "62",
  },
  {
    Utilisateur: "Amanda",
    Date: "plongeant",
    Status: "51",
  },
];

export const clientTableData = [
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "-10%",
      icon: "/path_to_icon_image.png"
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "-10%",
      icon: "/path_to_icon_image.png"
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "-10%",
      icon: "/path_to_icon_image.png"
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "-10%",
      icon: "/path_to_icon_image.png"
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "-10%",
      icon: "/path_to_icon_image.png"
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },

  // ... Add other rows with corresponding images and names here
];

export const topClientTableData = [
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "",
      icon: ""
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "",
      icon: ""
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "",
      icon: ""
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "",
      icon: ""
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },
  {
    user: {
      image: '/assets/salon_types/BarberShop.png',
      name: "Angelina vitale",
      discount: "",
      icon: ""
    },
    Date: "12/07/2023",
    Visites: 287,
    Commandes: 30,
    Dernière: "54 CHF",
    Details: "Detail",
    Status: "En cours",
    Total: "5946 CHF",
    styles: {
      Status: { color: 'red' },  // Set the font color of 'Status' to red
      Details: { textDecoration: 'underline' }  // Add this line to underline 'Details'
    }
  },

  // ... Add other rows with corresponding images and names here
];

export const yourChartData = {
  labels: ['Staff 1', 'Staff 2', 'Staff 3', 'Staff 4', 'Staff 5'],
  datasets: [
    {
      maxBarThickness: 150,
      backgroundColor: "#f6c23e", // Using yellow prop directly here for simplicity
      borderColor: 'transparent',
      borderRadius: { topRight: 15, topLeft: 15 },
      data: [80, 35, 50, 65, 90]
    }
  ]
}

export const yourChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 500 },
  scales: {
    x: {
      display: true,
      grid: {
        color: "#f1f1f1" // Using borderColor prop directly here for simplicity
      },
      ticks: { color: "#000" } // Using labelColor prop directly here for simplicity
    },
    y: {
      min: 0,
      max: 100,
      grid: {
        color: "#f1f1f1" // Using borderColor prop directly here for simplicity
      },
      ticks: {
        color: "#000", // Using labelColor prop directly here for simplicity
        padding: 10
      }
    }
  },
  plugins: {
    legend: { display: false }
  }
}


// Simulate async data fetching with a promise
const fetchData = (data: unknown) => {
  return new Promise((resolve) => {
    // Simulate an async call with setTimeout
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

// Later, replace the above fetchData with actual API calls
// For example:
// const fetchData = async (endpoint) => {
//   const response = await fetch(endpoint);
//   const data = await response.json();
//   return data;
// };

export const getOverviewData = () => fetchData(overviewData);
export const getMessagesData = () => fetchData(messagesData);
export const getActivityData = () => fetchData(activityData);
export const getClientTableData = () => fetchData(clientTableData);
