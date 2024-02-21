import { createNote, deleteNote } from '@/lib/actions';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Home() {
  const data = await prisma.note.findMany();
  return (
    <main className="p-10">
      <div className="font-mono">
        <h1>CRUD APP WITH NEXTJS SERVER ACTIONS</h1>
        <p>Simple nextjs app with server actions.</p>
        <form action={createNote} className="">
          <label htmlFor="text" className="block">
            Note
          </label>
          <textarea
            name="text"
            id="text"
            cols={30}
            rows={10}
            className="border border-black"
          ></textarea>
          <button type="submit" className="p-2 bg-blue-400 block">
            Submit
          </button>
        </form>

        {/* map the notes  */}
        <div className="mt-6 space-y-4">
          <h1 className="border-b">Notes...</h1>
          {data.map((item) => {
            const deleteNoteWithId = deleteNote.bind(null, item?.id);
            return (
              <div key={item?.id} className="underline block">
                <div className="inline-flex justify-center items-center gap-2">
                  <Link href={`/notes/${item?.id}`}>
                    <p>{item?.text}</p>
                  </Link>
                  <form action={deleteNoteWithId}>
                    <button type="submit" className="bg-red-400 p-2 rounded-md">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
