function DashboardHeader() {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex ">
                    <h1 className="text-3xl font-bold text-gray-900 m-0">
                        Services
                    </h1>
                    <button
                        type="button"
                        className="
                            ml-4
                            px-5
                            py-2
                            rounded
                            overflow-hidden
                            focus:outline-none focus:shadow-outline
                            transition
                            ease-out
                            duration-200
                            bg-blue-100
                            hover:bg-blue-500
                            text-blue-800 text-sm
                            hover:text-white
                            lg:text-base
                            "
                    >
                        Add New Service
                    </button>
                </div>
            </header>
        </div>
    );
}

export default DashboardHeader;
