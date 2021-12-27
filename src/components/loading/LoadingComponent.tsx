import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

function LoadingComponent(props: { loadingMessages: string[] }) {
    const [currentMessage, setCurrentMessage] = useState(
        props.loadingMessages[0]
    );
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setMessageIndex((prevIndex) =>
                prevIndex + 1 <= props.loadingMessages.length - 1
                    ? prevIndex + 1
                    : prevIndex
            );
        }, 3000);

        return () => clearInterval(timer);
    }, [props.loadingMessages.length]);

    useEffect(() => {
        setCurrentMessage(props.loadingMessages[messageIndex]);
    }, [messageIndex, props.loadingMessages]);

    return (
        <Dialog
            open={true}
            onClose={() => {}}
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="relative bg-gray-800 rounded max-w-sm mx-auto flex justify-center items-center p-4 shadow-lg mb-48">
                    <div className="flex justify-center items-center">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <p className="text-white animate-pulse text-md w-64 text-left tracking-widest">
                            {currentMessage}
                        </p>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default LoadingComponent;
