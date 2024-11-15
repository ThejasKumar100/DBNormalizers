
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Airline Ticket Management System
          <a
            className="text-primary hover:underline dark:text-primary-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </h1>
        {/* <br></br> */}

      

        <p className="mb-2">
          For testing CRUD operations, they can be tested through the two pages below.
          <br></br>Create is shown in the {"Make a new ticket"} page.
          <br></br>Read, Update and Delete functions are shown in the {"Search for an existing ticket"} page.
        </p>
        

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="./create"
            rel="noopener noreferrer"
          >
            Make a new ticket
          </a>

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="./search"
            // target="_blank"
            rel="noopener noreferrer"
          >
            Search for an existing ticket
          </a>

        </div>
      </main>
    </div>
  );
}
