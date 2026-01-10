import { splitSecret, combineShares } from './shamir';

test('SSS Split and Combine', () => {
    const secret = "my-secret-key";
    const shares = splitSecret(secret, 3, 2);
    expect(shares.length).toBe(3);
    
    const recovered = combineShares(shares.slice(0, 2));
    expect(recovered).toBe(secret);
});
