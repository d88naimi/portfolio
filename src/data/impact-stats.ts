export type ImpactStat = {
  key: "years" | "locations" | "checkins" | "nps";
  target: number;
  suffix: string;
  format: "plain" | "comma";
  label: string;
};

export const impactStats: ImpactStat[] = [
  { key: "years", target: 7, suffix: "+", format: "plain", label: "Years experience" },
  { key: "locations", target: 3500, suffix: "+", format: "comma", label: "Locations shipped" },
  { key: "checkins", target: 64, suffix: "%", format: "plain", label: "Faster check-ins" },
  { key: "nps", target: 100, suffix: "", format: "plain", label: "NPS score" },
];
