import QueryClientProvider from "./query-client-provider";
import SessionProvider from "./session-provider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";

export default function Providers(props: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        enableSystem={false}
        defaultTheme="dark"
      >
        <QueryClientProvider>
          <SessionProvider>{props.children}</SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </TooltipProvider>
  );
}
