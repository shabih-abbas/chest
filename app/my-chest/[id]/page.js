import { getThoughts } from "@/src/utils/dal";
export default async function ThoughtPage({params}){
    const {id} = await params;
    const thoughts= await getThoughts(parseInt(id));
    await new Promise(r => setTimeout(r, 5000));
    if(thoughts.length == 0)
        return <p className="text-primary text-center my-5 text-lg font-semibold">Looks like you had no thoughts that day!</p>
    return (
        <div>
            <h2 className="text-primary font-bold text-2xl text-center">{thoughts[0].time.toLocaleDateString("en-US",{
            year: "numeric",
            month: "long",
            day: "numeric"
        })}</h2>
            <div className="space-y-8 w-1/2 min-w-75 mx-auto my-8 p-3">
                {thoughts.map(thought=>(
                    <details key={thought.id}>
                        <summary className="bg-card py-2 px-4 rounded">{thought.time.toLocaleTimeString("en-US",{
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                        })}</summary>
                        <p className="text-foreground my-3 px-4">{thought.content}</p>
                    </details>
                ))}
            </div>
            
        </div>
        
    )
}