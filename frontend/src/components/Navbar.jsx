export default function Navbar() {
    return (
        <nav className="container relative mb-4">
            <div className="flex items-center justify-between">
                <a href="./index.html">
                    <h1 className="text-3xl font-semibold">Task Manager</h1>
                </a>
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                    <input type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" />
                </div>
            </div>
        </nav>
    )
}