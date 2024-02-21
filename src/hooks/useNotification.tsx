"use client";

import { createContext, useMemo, useState, useContext, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { dashboard } from "@/api/dashboard";

export interface NotificationContextStateProps {
  notifications: any;
  refetchUserNotifications: () => Promise<void>;
  refetchSalonNotifications: () => Promise<void>;
}

export const initialNotificationContextState: NotificationContextStateProps = {
  notifications: null,
  refetchUserNotifications: async () => {},
  refetchSalonNotifications: async () => {},
};

export const NotificationContext = createContext<NotificationContextStateProps>(
  initialNotificationContextState
);

export const NotificationContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [notifications, setNotifications] = useState<any>();

  const value: NotificationContextStateProps = useMemo(() => {
    async function refetchUserNotifications() {
      const { data } = await dashboard.userNotification();
      setNotifications(data);
    }

    async function refetchSalonNotifications() {
        const { data } = await dashboard.salonNotification();
        setNotifications(data);
      }

    const baseContextValue = {
      notifications,
      refetchUserNotifications,
      refetchSalonNotifications
    };
    return baseContextValue;
  }, [notifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      `useNotification must be used within a NotificationContextProvider.`
    );
  }
  return {
    notifications: context.notifications ?? {},
    refetchUserNotifications: context.refetchUserNotifications,
    refetchSalonNotifications: context.refetchSalonNotifications,
  };
};
