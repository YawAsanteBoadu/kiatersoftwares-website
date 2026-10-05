import { describe, expect, it } from "vitest";
import {
  buildWhatsAppLink,
  formatProjectBrief,
  similarProjectMessage,
  toInternationalNumber,
  WHATSAPP_NUMBER,
} from "./whatsapp";

describe("toInternationalNumber", () => {
  it("converts a local Ghana number by dropping the leading zero", () => {
    expect(toInternationalNumber("0533289892")).toBe("233533289892");
  });
  it("strips formatting from an international number", () => {
    expect(toInternationalNumber("+233 53 328 9892")).toBe("233533289892");
    expect(toInternationalNumber("00233533289892")).toBe("233533289892");
  });
  it("leaves an already-normalised number unchanged", () => {
    expect(toInternationalNumber("233533289892")).toBe("233533289892");
  });
});

describe("buildWhatsAppLink", () => {
  it("targets the business number with an encoded message", () => {
    expect(WHATSAPP_NUMBER).toBe("233533289892");
    const link = buildWhatsAppLink("Hi, I would like to request a technology quote.");
    expect(link).toBe(
      "https://wa.me/233533289892?text=Hi%2C%20I%20would%20like%20to%20request%20a%20technology%20quote.",
    );
  });
  it("round-trips special characters", () => {
    const message = similarProjectMessage('Shop & Stock "Pro"');
    const url = new URL(buildWhatsAppLink(message));
    expect(url.searchParams.get("text")).toBe(message);
  });
});

describe("formatProjectBrief", () => {
  it("includes every answered field and omits an empty timeline", () => {
    const message = formatProjectBrief({
      name: " Ama Mensah ",
      company: "Mensah Retail",
      email: "ama@example.com",
      phone: "0240000000",
      industry: "Retail",
      needs: ["Custom Software", "Hardware Procurement"],
      problem: "Stock is tracked in notebooks across three shops.",
    });
    expect(message).toContain("*Name:* Ama Mensah");
    expect(message).toContain("*Company / Organization:* Mensah Retail");
    expect(message).toContain("*What we need:* Custom Software, Hardware Procurement");
    expect(message).toContain("Stock is tracked in notebooks across three shops.");
    expect(message).not.toContain("timeline");
  });
  it("includes the timeline when provided", () => {
    const message = formatProjectBrief({
      name: "A",
      company: "B",
      email: "c@d.com",
      phone: "1",
      industry: "Other",
      needs: ["Not Sure"],
      problem: "x",
      timeline: "1–3 months",
    });
    expect(message).toContain("*Expected timeline:* 1–3 months");
  });
});
