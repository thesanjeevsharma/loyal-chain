import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RewardNFTModule = buildModule("RewardNFT", (m) => {
    const defaultOwner = '0xF1d0f4367Acd3c84941FD301f92dF8aa84F50888';
  
    const contracts = Array.from({ length: 4 }, (_, i) => {
      const name = m.getParameter(`name${i + 1}`, 'orgX');
      const symbol = m.getParameter(`symbol${i + 1}`, 'hlt');
      const initialOwner = m.getParameter(`initialOwner${i + 1}`, defaultOwner);
  
      return m.contract("RewardNFT", [name, symbol, initialOwner], { id: `RewardNFT${i + 1}` });
    });
  
    return {
      hot1: contracts[0],
      hot2: contracts[1],
      hot3: contracts[2],
      hot4: contracts[3],
    };
  });

export default RewardNFTModule;
