import React, { useState } from 'react';
import { useWallets } from '@privy-io/react-auth';
// Optionally, import if using a library:
// import copy from 'copy-to-clipboard';

export default function WalletAddress() {
  const { wallets, ready } = useWallets();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      // Clear feedback after a short delay
      setTimeout(() => {
        setCopiedAddress((prev) => (prev === address ? null : prev));
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  if (!ready) return <nav>Loading wallets…</nav>;

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      {wallets.length > 0 ? (
        wallets.map((wallet) => {
          const addr = wallet.address;
          const short = `${addr.slice(0, 6)}…${addr.slice(-4)}`;

          return (
            <div key={addr} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <span>{short}</span>
              <button
                onClick={() => void handleCopy(addr)}
                style={{ marginLeft: '0.5rem' }}
              >
                Copy
              </button>
              {copiedAddress === addr && (
                <span style={{
                  position: 'absolute',
                  top: '-1.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#333',
                  color: '#fff',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem'
                }}>
                  Copied!
                </span>
              )}
            </div>
          );
        })
      ) : (
        <span>No wallets connected</span>
      )}
    </nav>
  );
}
