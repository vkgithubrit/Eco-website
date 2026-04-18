import React from "react";
import {
  Mail,
  User,
  Phone,
  MapPin,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header Card */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {user?.name || "User"}
              </h1>

              <p className="text-indigo-100 mt-2 flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {user?.email || "user@gmail.com"}
              </p>

              <p className="mt-3 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm">
                <ShieldCheck className="h-4 w-4" />
                Verified Account
              </p>
            </div>

          </div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Personal Info
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <User className="text-indigo-600 h-5 w-5" />
                <span>{user?.name || "User"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-indigo-600 h-5 w-5" />
                <span>{user?.email || "user@gmail.com"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-indigo-600 h-5 w-5" />
                <span>+91 XXXXXXXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-indigo-600 h-5 w-5" />
                <span>India</span>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Account Actions
            </h2>

            <div className="space-y-4">

              <button className="w-full py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Edit Profile
              </button>

              <button className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                Change Password
              </button>

              <button
                onClick={logout}
                className="w-full py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;