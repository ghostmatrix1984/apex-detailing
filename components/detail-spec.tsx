"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DetailSpecService = {
  id: string;
  label: string;
  price: number;
};

/**
 * A snapshot of the Build Your Detail configurator, captured when the visitor
 * clicks "Request this detail" and carried through to the booking section.
 */
export type DetailSpec = {
  vehicleId: string;
  vehicleLabel: string;
  services: DetailSpecService[];
  total: number;
  requestedAt: number;
};

export type DetailSpecInput = Omit<DetailSpec, "requestedAt">;

type DetailSpecContextValue = {
  spec: DetailSpec | null;
  requestDetail: (input: DetailSpecInput) => void;
  clearSpec: () => void;
};

const DetailSpecContext = createContext<DetailSpecContextValue | null>(null);

export function DetailSpecProvider({ children }: { children: ReactNode }) {
  const [spec, setSpec] = useState<DetailSpec | null>(null);

  const requestDetail = useCallback(
    (input: DetailSpecInput) => setSpec({ ...input, requestedAt: Date.now() }),
    [],
  );
  const clearSpec = useCallback(() => setSpec(null), []);

  const value = useMemo(
    () => ({ spec, requestDetail, clearSpec }),
    [spec, requestDetail, clearSpec],
  );

  return (
    <DetailSpecContext.Provider value={value}>
      {children}
    </DetailSpecContext.Provider>
  );
}

export function useDetailSpec() {
  const context = useContext(DetailSpecContext);
  if (!context) {
    throw new Error("useDetailSpec must be used within a <DetailSpecProvider>");
  }
  return context;
}

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function formatGBP(value: number): string {
  return gbp.format(value);
}

/** Plain-text rendering of a specification for the enquiry payload. */
export function formatDetailSpec(spec: DetailSpec): string {
  const services = spec.services.length
    ? spec.services
        .map((service) => `- ${service.label}: ${gbp.format(service.price)}`)
        .join("\n")
    : "- No services selected yet";
  return [
    `Vehicle class: ${spec.vehicleLabel}`,
    "Selected services:",
    services,
    `Indicative total: ${gbp.format(spec.total)}`,
  ].join("\n");
}
