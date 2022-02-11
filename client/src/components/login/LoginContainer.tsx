import React from "react";

function LoginContainer() {
    return (
        <div className="w-ful flex h-full flex-col items-center  p-5">
            <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="h-10 w-full rounded-sm border-b-2 border-b-white bg-transparent p-2 text-white shadow-lg focus:outline-none"
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="mt-4 h-10 w-full rounded-sm border-b-2 border-b-white bg-transparent p-2 text-white shadow-lg focus:outline-none"
            />
            <button
                type="submit"
                className="mt-4 h-10 w-full rounded-sm bg-white p-2 text-gray-800 shadow-lg hover:bg-gray-800 hover:text-white focus:outline-none"
            >
                Login
            </button>
        </div>
    );
}

export default LoginContainer;
