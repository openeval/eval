"use client";

import { createContextualCan } from "@casl/react";
import { createContext } from "react";

import { defineAbilityFor, type AppAbility } from "~/config/security";

export const AbilityContext = createContext<AppAbility>(undefined!);

export function AbilityProvider({ children, user, ...props }) {
  const ability = defineAbilityFor(user);

  return (
    <AbilityContext.Provider value={ability} {...props}>
      {children}
    </AbilityContext.Provider>
  );
}

export const Can = createContextualCan(AbilityContext.Consumer);
