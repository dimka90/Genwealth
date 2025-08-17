import {usePrivy} from '@privy-io/react-auth';

export default function PrivyStatus () {
  const {ready} = usePrivy();

  if (!ready) {
    return <div>Loading...</div>;
  }

  // Now it's safe to use other Privy hooks and state
  return <div>Privy is ready!</div>;
}