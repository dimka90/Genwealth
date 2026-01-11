"use client";
import { useState, useEffect } from 'react';
import { useGenwealthVault } from '@/hooks/useGenwealthVault';
import { FaUserCheck, FaClock, FaCheckCircle } from 'react-icons/fa';

interface TrusteeApprovalListProps {
    ownerAddress: string;
}

export default function TrusteeApprovalList({ ownerAddress }: TrusteeApprovalListProps) {
    const { getSettings, approveRecovery, address } = useGenwealthVault();
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getSettings(ownerAddress);
            setSettings(data);
        };
        if (ownerAddress) fetchSettings();
    }, [ownerAddress, getSettings]);

    const handleApprove = async () => {
        setLoading(true);
        try {
            await approveRecovery(ownerAddress);
            // Refresh settings after approval
            const data = await getSettings(ownerAddress);
            setSettings(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (!settings) return null;

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
                <FaUserCheck className="text-green-400" />
                <h3 className="text-lg font-semibold text-white">Recovery Approvals</h3>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Current Approvals:</span>
                    <span className="text-white font-bold">{Number(settings.currentApprovals || 0)} / {Number(settings.threshold || 1)}</span>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-green-500 h-full transition-all duration-500"
                        style={{ width: `${(Number(settings.currentApprovals || 0) / Number(settings.threshold || 1)) * 100}%` }}
                    />
                </div>

                {settings.recoveryActive ? (
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                        <FaCheckCircle />
                        <span className="font-medium">Recovery is Active</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 p-3 rounded-lg">
                        <FaClock />
                        <span className="font-medium">Waiting for Approvals</span>
                    </div>
                )}

                <button
                    onClick={handleApprove}
                    disabled={loading || settings.recoveryActive}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? "Approving..." : "Approve Recovery"}
                </button>
            </div>
        </div>
    );
}
