import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Activity } from "lucide-react";
import AdminLayout from "../../components/Admin/AdminLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AllActivity() {
  const { token } = useAdminAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/dashboard-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.activities || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Activity fetch error:", err);
        setLoading(false);
      });
  }, [token]);

  const getBadgeColor = (action) => {
    if (action === "signup")
      return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    if (action === "login")
      return "bg-blue-50 text-blue-600 border border-blue-100";
    if (action === "order")
      return "bg-amber-50 text-amber-600 border border-amber-100";
    if (action === "password_reset")
      return "bg-rose-50 text-rose-600 border border-rose-100";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
        {/* Page heading */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">Activity Log</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Complete history of user activities.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <Activity size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-black">{activities.length} Total</span>
          </div>
        </div>

        {/* Activity container */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <p className="text-sm text-gray-400 py-12 text-center">No activities recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex gap-3 items-start p-3 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-all"
                >
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shrink-0 ${getBadgeColor(activity.action)}`}
                  >
                    {activity.action === "password_reset" ? "RESET PS" : activity.action.replace("_", " ")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-left md:text-center">
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-800 leading-tight truncate">
                          {activity.userName}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-normal line-clamp-2">
                          {activity.details}
                        </p>
                      </div>
                      <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider shrink-0 md:ml-4">
                        {new Date(activity.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        •{" "}
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
