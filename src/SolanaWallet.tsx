import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import "./SolanaWallet.css";

interface SolanaWalletProps {
  mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Solana Wallet Generator</h2>
      <button
        className="generate-button"
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
        }}
      >
        Add Solana Wallet
      </button>

      <div className="address-list">
        {publicKeys.map((key, index) => (
          <div key={index} className="address-item">
            <span>Solana Wallet {index + 1}:</span>
            <span className="address">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
