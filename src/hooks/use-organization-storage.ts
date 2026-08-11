"use client";

import { useSyncExternalStore } from "react";

export interface StoredOrganization {
  id?: number;
  code?: string;
  name?: string;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem("organization");
}

function getServerSnapshot() {
  return null;
}

export function useOrganizationStorage() {
  const rawOrganization = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!rawOrganization) {
    return null;
  }

  try {
    return JSON.parse(rawOrganization) as StoredOrganization;
  } catch {
    return null;
  }
}
