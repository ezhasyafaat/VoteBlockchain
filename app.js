const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Address of smart contract
const contractAddress = "0xeF86747C80bd04dC9e2dae3eF97bb499078DD51A";

// ABI of smart contract
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_candidates",
                "type": "string[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "candidate",
                "type": "string"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "candidate",
                "type": "string"
            }
        ],
        "name": "totalVotesFor",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "candidate",
                "type": "string"
            }
        ],
        "name": "validCandidate",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "votes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const votingContract = new web3.eth.Contract(contractABI, contractAddress);

async function vote() {
    const candidate = document.getElementById("candidate").value;
    if (!candidate) {
        alert("Please select a candidate");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];

    votingContract.methods.vote(candidate).send({ from }, function (error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log(result);
            showResult(candidate);
        }
    });
}

function showResult(candidate) {
    votingContract.methods.totalVotesFor(candidate).call(function (error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log(result);
            document.getElementById("result").innerHTML = `${candidate} has ${result} vote(s)`;
        }
    });
}
