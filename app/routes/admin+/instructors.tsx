import { useConfigurables } from "~/modules/configurables";

export default function InstructorsPage() {
  const { config } = useConfigurables();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Instructors</h1>
          <p className="text-gray-600 mt-2">View and manage teaching staff</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <button
              className="px-4 py-2 rounded text-white font-medium transition"
              style={{ backgroundColor: config.brandColor?.secondary }}
            >
              Add New Instructor
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-t border-b bg-gray-50">
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Specializations</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Students</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No instructors yet. Start by adding a new instructor.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
