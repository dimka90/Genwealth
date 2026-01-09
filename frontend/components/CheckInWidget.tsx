"use client";
import { useState, useEffect } from 'react';
import { useGenwealthVault } from '@/hooks/useGenwealthVault';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function CheckInWidget() {
    const { address, getSettings, checkIn } = useGenwealthVault();
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (address) {
            const settings = await getSettings(address);
            if (settings) {
                const lastCheckIn = Number(settings.lastCheckIn);
                const period = Number(settings.inactivityPeriod);
                const now = Math.floor(Date.now() / 1000);
                const remainingSeconds = (lastCheckIn + period) - now;
                setDaysRemaining(Math.max(0, Math.ceil(remainingSeconds / (24 * 60 * 60))));
            }
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [address]);

    const handleCheckIn = async () => {
        setLoading(true);
        try {
            await checkIn();
            await fetchData(); // Refresh data
            alert("Check-in successful!");
        } catch (e) {
            console.error(e);
            alert("Check-in failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <FaCheckCircle className="text-indigo-400" />
                    Account Activity
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-900/30 text-indigo-400">
                    Active
                </span>
            </div>

            <div className="space-y-5">
                <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Check-in progress</span>
                        <span>{daysRemaining !== null ? `${daysRemaining} days remaining` : 'Loading...'}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: daysRemaining !== null ? `${Math.min(100, (daysRemaining / 30) * 100)}%` : '0%' }}
                        />
                    </div>
                </div>

                <button
                    onClick={handleCheckIn}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? "Checking In..." : "Perform Check-in"}
                </button>

                {daysRemaining !== null && daysRemaining < 7 && (
                    <div className="flex items-center gap-2 text-yellow-500 text-sm bg-yellow-900/20 p-3 rounded-lg">
                        <FaExclamationTriangle />
                        <span>Warning: Check in soon to prevent recovery initiation!</span>
                    </div>
                )}
            </div>
        </div>
    );
}
