export default function Loader(){
    return (
        <div className="flex items-center space-x-1.5">
            <span className="sr-only">Loading...</span>
            <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.12s]"></div>
            <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
        </div>
    )
}