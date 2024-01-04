# Installation

### Using the Benchmarker

The repository over at the Hyperledger Organization contains the most stable updates of the benchmarker.&#x20;



### Pre-requisites:

#### Foundry:

This is a smart contract development toolchain that lets you compile, test, run scripts and essentially interact with smart contracts from your computer.&#x20;

[https://book.getfoundry.sh/getting-started/installation](https://book.getfoundry.sh/getting-started/installation)



#### Node js package managers

You can use npm or yarn \* to install the packages used by the benchmarker.

We used `node v18.17.1` and `yarn 1.22.19`

npm&#x20;

[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

yarn&#x20;

[https://classic.yarnpkg.com/en/docs/install#debian-stable](https://classic.yarnpkg.com/en/docs/install#debian-stable)

\* We tried setting it up with Bun but we encoutered some errors.&#x20;

As we used `yarn` the scripts in `package.json` are configured to use `yarn`. If you use `npm` you need to replace the occurrences of `yarn` with `npm.`

#### Python package manager

You can use pip3 or conda to install the python packages involved.&#x20;

We used `python 3.9.18` and anaconda to install the package

pip3

[https://pypi.org/project/pip/](https://pypi.org/project/pip/)

conda&#x20;

[https://docs.conda.io/projects/conda/en/stable/](https://docs.conda.io/projects/conda/en/stable/)

#### Benchmarker

To get the benchmarker onto your computer, run:

```sh
git clone https://github.com/hyperledger-labs/benchmarking-cross-chain-bridges.git
```
