export default function HowTo() {
  return (
    <div className="bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 px-28">
        <div className="border-r border-gray-800 pr-8">
          <h3 className="font-semibold">Sign In with Your Email</h3>
          <p className="text-gray-400 text-xs">
            Log in instantly using Privy, your wallet is created automatically
            in the background.
          </p>
        </div>
        <div className="border-r border-gray-800 pr-8">
          <h3 className="font-semibold">Encrypt & Assign Trustees</h3>
          <p className="text-gray-400 text-xs">
            Enter your secret, we encrypt it on your device, and split the key
            among three trusted contacts.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Store on Blockchain</h3>
          <p className="text-gray-400 text-xs">
            Upload your documents to IPFS, with proof recorded on-chain for
            tamper-proof security.
          </p>
        </div>
      </div>
    </div>
  );
}
