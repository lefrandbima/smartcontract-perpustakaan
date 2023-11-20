import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async ({
    deployments,
    ethers,
  }: HardhatRuntimeEnvironment) => {
    const {deploy} = deployments;
    const accounts = await ethers.getSigners();

    const deployer = accounts[0];
  
    // deploy SimpleLibrary
    const simpleLibrary = await deploy('SimpleLibrary', {
        contract: "SimpleLibrary",
        from: deployer.address,
        args: [],
        gasLimit: 1000000,
    });
    console.log("simpleLibrary deployed at", simpleLibrary.address)
  };

  func.tags = ['SimpleLibrary'];

  export default func;