/**
 * Enquiry submission layer.
 *
 * When NEXT_PUBLIC_FORMSPREE_ENDPOINT is set to a Formspree-style endpoint,
 * enquiries are POSTed to it as JSON. When it is absent the form stays in
 * preview mode: nothing is sent anywhere and the UI never pretends otherwise.
 */

export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  contactMethod: string;
  message: string;
  specification: string;
};

export type EnquirySubmitResult =
  | { outcome: "sent" }
  | { outcome: "not-configured" }
  | { outcome: "failed"; status?: number };

// Direct property access so Next.js can inline the value into the client bundle.
const FORMSPREE_ENDPOINT: string | undefined =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export function isEnquirySubmissionConfigured(): boolean {
  return Boolean(FORMSPREE_ENDPOINT);
}

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquirySubmitResult> {
  const endpoint = FORMSPREE_ENDPOINT;
  if (!endpoint) {
    return { outcome: "not-configured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      return { outcome: "sent" };
    }
    return { outcome: "failed", status: response.status };
  } catch {
    return { outcome: "failed" };
  }
}
