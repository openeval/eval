export const FlowTypes = {
  CANDIDATE_INVITED: "CANDIDATE_INVITED",
  TEAM_MEMEBER_INVITED: "TEAM_MEMEBER_INVITED",
} as const;

export type FlowType = (typeof FlowTypes)[keyof typeof FlowTypes];
