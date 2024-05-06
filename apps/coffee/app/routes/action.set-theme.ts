import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "../components/theme-session";

export const action = createThemeAction(themeSessionResolver);
