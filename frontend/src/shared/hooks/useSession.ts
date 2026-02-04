"use client";

import { useCallback, useEffect, useState } from "react";

interface SessionState {
  userId: string;
  name: string;
  email: string;
}

const storageKey = "aicheif.session";

export const useSession = () => {
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      setSession(JSON.parse(raw) as SessionState);
    }
  }, []);

  const signIn = useCallback((next: SessionState) => {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSession(next);
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(storageKey);
    setSession(null);
  }, []);

  return { session, signIn, signOut };
};
