import { NotesTask } from "./note-data";

function NewNotes() {

  
    return (
      <div className="p-5 text-sm">
        <h2 className="text-base font-semibold mb-4">Task Notes</h2>
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full table-auto text-left text-xs border-collapse">
            <thead className="bg-gray-100 font-semibold text-gray-700">
              <tr className="font-bold">
                <th className="px-4 py-2 border-b text-lg font-bold">Date</th>
                <th className="px-4 py-2 border-b text-lg font-bold">Task</th>
                <th className="px-4 py-2 border-b text-lg font-bold">Status</th>
                <th className="px-4 py-2 border-b text-lg font-bold">Page</th>
              </tr>
            </thead>
            <tbody>
              {NotesTask.map((note, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b h-20">
                  <td className="px-4 py-2">{note.date}</td>
                  <td className="px-4 py-2">{note.task}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        note.status === "Done"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {note.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{note.page}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default NewNotes;
  