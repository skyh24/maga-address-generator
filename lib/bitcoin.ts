import { Buffer } from 'buffer';

let bitcoin: typeof import('bitcoinjs-lib');
let ECPair: any;
let ecc: any;

export interface AddressResult {
  address: string;
  privateKey: string;
}

export async function initBitcoin() {
  if (!bitcoin) {
    const bitcoinjs = await import('bitcoinjs-lib');
    const tiny = await import('tiny-secp256k1');
    const ecpair = await import('ecpair');
    
    bitcoin = bitcoinjs;
    ecc = tiny.default || tiny;
    bitcoin.initEccLib(ecc);
    ECPair = ecpair.ECPairFactory(ecc);
  }
  return { bitcoin, ECPair };
}

export async function generateAddress(): Promise<AddressResult> {
  const { bitcoin, ECPair } = await initBitcoin();
  
  const keyPair = ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.bitcoin,
  });

  return {
    address: address || '',
    privateKey: keyPair.privateKey?.toString('hex') || '',
  };
}