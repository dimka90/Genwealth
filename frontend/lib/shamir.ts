const GF256_POLY = 0x11b; // x^8 + x^4 + x^3 + x + 1
const exp = new Uint8Array(512);
const log = new Uint8Array(256);

// Initialize GF(2^8) log and exp tables
let x = 1;
for (let i = 0; i < 255; i++) {
  exp[i] = x;
  exp[i + 255] = x;
  log[x] = i;
  x <<= 1;
  if (x & 0x100) x ^= GF256_POLY;
}

const gfMul = (a: number, b: number): number => {
  if (a === 0 || b === 0) return 0;
  return exp[log[a] + log[b]];
};

const gfDiv = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division by zero");
  if (a === 0) return 0;
  return exp[log[a] - log[b] + 255];
};

const polyEval = (coeffs: number[], x: number): number => {
  let result = 0;
  for (let i = coeffs.length - 1; i >= 0; i--) {
    if (result === 0) result = coeffs[i];
    else result = coeffs[i] ^ gfMul(result, x);
  }
  return result;
};

export const splitSecret = (secret: string, shares: number, threshold: number): string[] => {
  const secretBytes = new TextEncoder().encode(secret);
  const result: string[][] = Array.from({ length: shares }, () => []);

  for (const byte of secretBytes) {
    const coeffs = [byte];
    for (let i = 1; i < threshold; i++) {
      coeffs.push(Math.floor(Math.random() * 255) + 1);
    }

    for (let i = 1; i <= shares; i++) {
      result[i - 1].push(polyEval(coeffs, i).toString(16).padStart(2, '0'));
    }
  }

  return result.map((share, idx) => `${idx + 1}-${share.join('')}`);
};

export const combineShares = (shares: string[]): string => {
  if (shares.length === 0) return "";

  const parsedShares = shares.map(s => {
    const [xStr, hex] = s.split('-');
    const bytes = hex.match(/.{1,2}/g)?.map(b => parseInt(b, 16)) || [];
    return { x: parseInt(xStr), y: bytes };
  });

  const threshold = parsedShares.length;
  const secretLength = parsedShares[0].y.length;
  const result = new Uint8Array(secretLength);

  for (let i = 0; i < secretLength; i++) {
    let secretByte = 0;
    for (let j = 0; j < threshold; j++) {
      let lagrange = 1;
      for (let k = 0; k < threshold; k++) {
        if (j === k) continue;
        const num = parsedShares[k].x;
        const den = parsedShares[j].x ^ parsedShares[k].x;
        lagrange = gfMul(lagrange, gfDiv(num, den));
      }
      secretByte ^= gfMul(parsedShares[j].y[i], lagrange);
    }
    result[i] = secretByte;
  }

  return new TextDecoder().decode(result);
};