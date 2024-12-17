import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import './EthWallet.css';

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Ethereum Wallet Generator</h2>

      <button
        className="generate-button"
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const wallet = new Wallet(child.privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add ETH Wallet
      </button>

      <div className="address-list">
        {addresses.map((address, index) => (
          <div key={index} className="address-item">
            <span>ETH Wallet {index + 1}:</span>
            <span className="address">{address}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
