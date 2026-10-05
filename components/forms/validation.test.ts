import { describe, expect, it } from "vitest";
import { validateProjectBrief } from "./validation";

const valid = {
  name: "Kofi Boateng",
  company: "Boateng Logistics",
  email: "kofi@boateng.com",
  phone: "024 000 0000",
  industry: "Logistics",
  needs: ["Custom Software"],
  problem: "We track deliveries on paper and lose visibility of drivers.",
  timeline: "",
};

describe("validateProjectBrief", () => {
  it("accepts a complete brief", () => {
    expect(validateProjectBrief(valid)).toEqual({});
  });

  it("flags every missing required field in on-screen order", () => {
    const errors = validateProjectBrief({
      ...valid,
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "",
      needs: [],
      problem: "",
    });
    expect(Object.keys(errors)).toEqual(["name", "company", "email", "phone", "industry", "needs", "problem"]);
  });

  it("rejects malformed email and phone values", () => {
    const errors = validateProjectBrief({ ...valid, email: "kofi@", phone: "12ab" });
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
  });

  it("accepts international phone formats", () => {
    expect(validateProjectBrief({ ...valid, phone: "+233 (0)24-000-0000" }).phone).toBeUndefined();
  });

  it("requires a meaningful problem description", () => {
    expect(validateProjectBrief({ ...valid, problem: "Need app" }).problem).toBeDefined();
    expect(validateProjectBrief({ ...valid, problem: "x".repeat(1501) }).problem).toBeDefined();
  });

  it("treats the timeline as optional", () => {
    expect(validateProjectBrief({ ...valid, timeline: undefined }).timeline).toBeUndefined();
  });
});
