import Note from "@/app/components/Note"
import  {Note as N}  from "@/app/utils/type"

async function getNotes(username:string) {
    const res = await fetch(new URL(`/api/${username}/notes`,process.env.HOST||"https://next-full-note.vercel.app"),{
        cache:"no-store",
        
    })
    const notes:N[] = await res.json();
    return notes
}

export default async function NotePage({params}:{params:{username:string}}){
    if (!params || !params.username) {
        console.error("Missing username parameter");
        return null;
    }
    try {
        const notes = await getNotes(params.username);
        if(notes.length!==0){
            return (
                <div>
                    {notes.map(note => (
                        <Note id={note._id} username={params.username} title={note.title} body={note.body} key={note._id} />
                    ))}
                </div>
            );
        }else{
            return(
                <div className=" mt-56 text-3xl font-semibold text-gray-400 text-center">No note at the moment</div>
            )
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}