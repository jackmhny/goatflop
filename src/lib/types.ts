// Poker positions
export type Position = "BTN" | "CO" | "HJ" | "LJ" | "SB" | "BB";

// Action types
export type Action = "RFI" | "VS_RFI_IP" | "VS_RFI_OOP" | "SB_VS_BB";

// SB vs BB specific action
export type SBvsBBAction = "LIMP" | "RAISE";

// Scenario to determine which image to show
export interface Scenario {
  heroPosition?: Position;
  villainPosition?: Position;
  action: Action;
  sbAction?: SBvsBBAction;
}

// Mapping for image filenames
export const getImageFilename = (scenario: Scenario): string => {
  const { heroPosition, villainPosition, action, sbAction } = scenario;

  switch (action) {
    case "RFI":
      return `RFI_${heroPosition}.png`;
    case "VS_RFI_IP":
      return `IP_${heroPosition}_${villainPosition}.png`;
    case "VS_RFI_OOP":
      return `OOP_${heroPosition}_${villainPosition}.png`;
    case "SB_VS_BB":
      return `BB_VS_SB_${sbAction}.png`;
    default:
      return "";
  }
};

// Image path helper
export const getImagePath = (filename: string): string => {
  return `/images/${filename}`;
};

// Position labels
export const positionLabels: Record<Position, string> = {
  BTN: "Button",
  CO: "Cutoff",
  HJ: "Hijack",
  LJ: "Lojack",
  SB: "Small Blind",
  BB: "Big Blind"
};