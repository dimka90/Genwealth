"use client";
import { useState } from 'react';
import { useGenwealthVault } from '@/hooks/useGenwealthVault';
import { FaClock, FaSave } from 'react-icons/fa';

export default function InactivitySettings() {
    // Default 30 days in seconds
    const [periodDays, setPeriodDays] = useState(30);
    const [threshold, setThreshold] = useState(1);
    const { setupVault } = useGenwealthVault();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const seconds = periodDays * 24 * 60 * 60;
            await setupVault(seconds, threshold);
            alert("Settings updated!");
        } catch (e) {
            console.error(e);
            alert("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
                <FaClock className="text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">Inactivity Settings</h3>
            </div>

            <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">
                    Trigger recovery after inactivity of:
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="1"
                        max="365"
                        value={periodDays}
                        onChange={(e) => setPeriodDays(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">
                    Required trustee approvals to recover:
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={threshold}
                        onChange={(e) => setThreshold(parseInt(e.target.value) || 1)}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <span className="text-white font-bold w-20 text-right">{threshold} {threshold === 1 ? 'trustee' : 'trustees'}</span>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
                <FaSave />
                {loading ? "Saving..." : "Update Settings"}
            </button>
        </div>
    );
}
