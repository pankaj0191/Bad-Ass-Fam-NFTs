// const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMinter", function () {
  it("Should return the new max mint amount", async function () {
    const NFTMinter = await ethers.getContractFactory("NFTMinter");
    const minter = await NFTMinter.deploy("Bad Ass Fam", "BAF", "", 5);
    await minter.deployed();

    const mintAmount = await minter.maxMintAmount();

    console.log(`Max Mint Amount :- ${mintAmount}`)
  });
});
