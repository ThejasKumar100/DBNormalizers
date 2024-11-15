export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            
                <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
                Ticket Search
                    <a
                        className="text-primary hover:underline dark:text-primary-dark"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    </a>
                </h1>
        
                
        
                <div className="textInputWrapper">
                    <p>
                        Enter the ticket ID:
                    </p>
        
                    <input type="text" className="textInput">
                    </input>
                </div>


                <button> Submit
                </button>

            </main>
        </div>
    );
  }
  