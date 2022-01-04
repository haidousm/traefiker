import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = (console: any) => ({
    ...console,
    warn: (...args: (string | string[])[]) =>
        args[0].includes("Duplicate atom key") ? null : console.warn(...args),
});
global.console = mutedConsole(global.console);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    );
}

export default MyApp;
