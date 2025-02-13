import type { GlobalProvider } from "@ladle/react";
import "../app/globals.css";
import * as React from "react";

export const Provider: GlobalProvider = ({ children }) => <>{children}</>;
