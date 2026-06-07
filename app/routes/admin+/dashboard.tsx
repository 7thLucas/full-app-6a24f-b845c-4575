import { useConfigurables } from "~/modules/configurables";

export default function AdminDashboard() {
  const { config, loading } = useConfigurables();

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {config.appName || "Music School Manager"} - Admin Dashboard
          </h1>
          {config.schoolDescription && (
            <p className="mt-2 text-gray-600">{config.schoolDescription}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card: Students */}
          <div
            className="rounded-lg shadow p-6"
            style={{ borderLeft: `4px solid ${config.brandColor?.primary || "#2563EB"}` }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Students</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: config.brandColor?.primary }}>
              0
            </p>
            <p className="text-sm text-gray-600 mt-1">Active enrolled students</p>
          </div>

          {/* Card: Instructors */}
          <div
            className="rounded-lg shadow p-6"
            style={{ borderLeft: `4px solid ${config.brandColor?.secondary || "#F59E0B"}` }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Instructors</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: config.brandColor?.secondary }}>
              0
            </p>
            <p className="text-sm text-gray-600 mt-1">Teaching staff</p>
          </div>

          {/* Card: Lessons This Week */}
          <div
            className="rounded-lg shadow p-6"
            style={{ borderLeft: `4px solid ${config.brandColor?.accent || "#10B981"}` }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Lessons</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: config.brandColor?.accent }}>
              0
            </p>
            <p className="text-sm text-gray-600 mt-1">Scheduled this week</p>
          </div>

          {/* Card: Upcoming Recitals */}
          <div
            className="rounded-lg shadow p-6"
            style={{ borderLeft: `4px solid ${config.brandColor?.primary || "#2563EB"}` }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Recitals</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: config.brandColor?.primary }}>
              0
            </p>
            <p className="text-sm text-gray-600 mt-1">Upcoming events</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <a
                  href="/admin/students"
                  className="block w-full text-left px-4 py-2 rounded transition"
                  style={{ backgroundColor: config.brandColor?.primary + "10", color: config.brandColor?.primary }}
                >
                  Manage Students
                </a>
                <a
                  href="/admin/instructors"
                  className="block w-full text-left px-4 py-2 rounded transition"
                  style={{ backgroundColor: config.brandColor?.secondary + "10", color: config.brandColor?.secondary }}
                >
                  Manage Instructors
                </a>
                <a
                  href="/admin/lessons"
                  className="block w-full text-left px-4 py-2 rounded transition"
                  style={{ backgroundColor: config.brandColor?.accent + "10", color: config.brandColor?.accent }}
                >
                  Schedule Lessons
                </a>
                <a
                  href="/admin/recitals"
                  className="block w-full text-left px-4 py-2 rounded transition"
                  style={{ backgroundColor: config.brandColor?.primary + "10", color: config.brandColor?.primary }}
                >
                  Manage Recitals
                </a>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity yet. Start by adding students and instructors!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
