/* eslint-disable @typescript-eslint/no-explicit-any */
export const bindTrailingArgs = (fn: any, ...bound_args: any) => {
    return function (...args: any) {
        return fn(...args, ...bound_args);
    };
};
