# Genwealth Development Roadmap & Next Steps

Based on the current codebase study, the project has a solid foundation for client-side encryption and vault management but requires additional implementation for full decentralization and production readiness.

## Proposed Next Steps

### 1. Complete Backend Implementation [CRITICAL]
The "Dead Man's Switch" logic needs to be fully operational.
- **Task**: Refine `CronScheduler` to check user inactivity.
- **Task**: Implement logic to mark vaults as "recovery available" and notify trustees via email.

### 2. Complete Frontend Implementation [CRITICAL]
Ensure the crypto and storage layers are real, not placeholders.
- **Task**: Implement real Shamir's Secret Sharing in `shamir.ts`.
- **Task**: Replace `ipfs.ts` placeholders with actual IPFS client logic (e.g., Pinata).
- **Task**: Connect `RecoveryFlow` and `SeedPhraseEntry` to the backend.

### 3. Smart Contract Implementation
Move the "Dead Man's Switch" logic on-chain for full decentralization.

### 4. Robust IPFS Storage
Enhance the current IPFS implementation to handle larger documents and provide decentralized redundancy.
- **Task**: Integrate with a pinning service (like Pinata) to ensure file persistence.
- **Task**: Store IPFS hashes on-chain for censorship-resistant metadata.

### 5. ZK-Proof Migration
Transition the trustee verification from email OTPs to a more decentralized model.
- **Goal**: Use ZK proofs to verify a trustee's identity or claim without the backend having to send an email.

---

## 🛠 Immediate Action Items
- [ ] Replace placeholder logic in `shamir.ts`.
- [ ] Implement the first Solidity contract for on-chain check-ins.
- [ ] Link `SeedPhraseEntry` settings (trustees) to the actual backend database.
