import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HotelRegistryModule = buildModule("HotelRegistry", (m) => {
  // Add a unique salt for each deployment
  const deploymentSalt = Date.now().toString();

  const hot = m.contract("HotelRegistry", []);

  return { hot };
});

export default HotelRegistryModule;
