import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";
import "./App.css";

function App(): JSX.Element {
  const [mnemonic, setMnemonic] = useState<string>(""); // State for storing the mnemonic phrase

  return (
    <div className="container">
      <h1>Web-Based Wallet</h1>

      {/* Button to generate a mnemonic phrase */}
      <button
        onClick={async () => {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>

      {/* Input to display the mnemonic */}
      <div>
        <h3>Your Mnemonic:</h3>
        <input type="text" value={mnemonic} readOnly />
      </div>

      {/* Solana Wallet Component */}
      {mnemonic && (
        <div>
          <h2>Solana Wallet</h2>
          <SolanaWallet mnemonic={mnemonic} />
        </div>
      )}

      {/* Ethereum Wallet Component */}
      {mnemonic && (
        <div>
          <h2>Ethereum Wallet</h2>
          <EthWallet mnemonic={mnemonic} />
        </div>
      )}
    </div>
  );
}

export default App;
