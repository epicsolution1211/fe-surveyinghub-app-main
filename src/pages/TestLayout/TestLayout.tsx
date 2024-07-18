
export const TestLayoutPage = () => {

    return <div className="flex h-svh">
        <aside className=" fixed w-full lg:h-auto h-full top-0 left-0 lg:w-[20%] xl:w-[22%] bg-[rgb(32,32,32)] lg:bg-opacity-60 lg:rounded-[20px] lg:border lg:border-[rgba(78,78,78,0.36)] lg:m-[20px] lg:relative  lg:translate-y-0 transform translate-y-full     transition-transform duration-300 ease-in-out" id="sidebar">
            <button className="close-btn" id="closeBtn">✖</button>
        </aside>
        <div className="flex flex-col flex-1 h-full">
            <header className="fixed bottom-0 left-0 right-0 lg:relative bg-[rgb(32,32,32)] lg:bg-opacity-60 lg:rounded-[20px] lg:border lg:border-[rgba(78,78,78,0.36)] lg:m-[20px] flex-grow-0">
                <button id="menuButton">☰ Menu</button>
            </header>
            <main className="bg-[rgb(32,32,32)] bg-opacity-60 rounded-[20px] border border-[rgba(78,78,78,0.36)] m-[20px] flex-1">
                <h1>Main Content</h1>
                <p>This is the main content area.</p>
            </main>
        </div>
    </div>
}

