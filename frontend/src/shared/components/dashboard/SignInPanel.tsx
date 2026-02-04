"use client";

import React, { useState } from "react";

interface SignInPanelProps {
  onSignIn: (userId: string, name: string, email: string) => void;
}

export const SignInPanel: React.FC<SignInPanelProps> = ({ onSignIn }) => {
  const [name, setName] = useState("Taylor Jordan");
  const [email, setEmail] = useState("taylor@example.com");
  const [userId, setUserId] = useState("user-1");

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Sign in</h2>
        <span className="pill neutral">Demo access</span>
      </div>
      <div className="form-grid">
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          User ID
          <input value={userId} onChange={(event) => setUserId(event.target.value)} />
        </label>
      </div>
      <button type="button" onClick={() => onSignIn(userId, name, email)}>
        Continue to dashboard
      </button>
    </section>
  );
};
