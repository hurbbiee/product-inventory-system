import { useSyncExternalStore } from "react";

export interface StoredUser {
  id?: number;
  name?: string;
  role?: string;
}

function subscribe(callback: () => void) {
  window.addEventListener("user", callback);

  return () => {
    window.removeEventListener("user", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem("user");
}

function getServerSnapshot() {
  return null;
}

export function useUserStorage() {
  const rawUser = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as StoredUser;
  } catch {
    return null;
  }
}
