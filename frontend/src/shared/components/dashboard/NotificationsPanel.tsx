"use client";

import React from "react";

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  status: "new" | "read";
}

interface NotificationsPanelProps {
  items: NotificationItem[];
  onMarkRead: (id: string) => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ items, onMarkRead }) => {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Notifications</h2>
        <span className="pill neutral">{items.filter((item) => item.status === "new").length} new</span>
      </div>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <span className="subtle">{item.detail}</span>
            <button type="button" className="ghost" onClick={() => onMarkRead(item.id)}>
              Mark read
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
