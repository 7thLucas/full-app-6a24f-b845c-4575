import { useConfigurables } from "~/modules/configurables";

export default function RecitalsPage() {
  const { config } = useConfigurables();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recital Management</h1>
          <p className="text-gray-600 mt-2">Plan and manage student recitals and performance events</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <button
              className="px-4 py-2 rounded text-white font-medium transition"
              style={{ backgroundColor: config.brandColor?.primary }}
            >
              Create New Recital
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-t border-b bg-gray-50">
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Event Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Venue</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Performers</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No recitals scheduled yet. Start by creating a new recital event.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
