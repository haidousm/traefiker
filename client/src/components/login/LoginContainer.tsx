import React, { useState } from "react";
import { login } from "../../utils/api";

function LoginContainer() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginClicked = async () => {
        const response = await login(username, password);
        if (response.status === 200) {
            const token = response.data.token.token;
            localStorage.setItem("token", token);
        }
    };

    return (
        <div className="w-ful flex h-full flex-col items-center  p-5">
            <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={username}
                className="h-10 w-full rounded-sm border-b-2 border-b-white bg-transparent p-2 text-white shadow-lg focus:outline-none"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                className="mt-4 h-10 w-full rounded-sm border-b-2 border-b-white bg-transparent p-2 text-white shadow-lg focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="mt-4 h-10 w-full rounded-sm bg-white p-2 text-gray-800 shadow-lg hover:bg-gray-800 hover:text-white focus:outline-none"
                onClick={loginClicked}
            >
                Login
            </button>
        </div>
    );
}

export default LoginContainer;
