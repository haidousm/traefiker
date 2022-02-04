import Image from "next/image";

function Navbar() {
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0"></div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
