// Contract ABIs - These will be generated after compilation
// Copy the ABI from build/contracts/*.json files after truffle compile

export const EXERCICE1_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nombre1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nombre2",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "nombre1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "nombre2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "addition1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "b",
        type: "uint256",
      },
    ],
    name: "addition2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nombre1",
        type: "uint256",
      },
    ],
    name: "setNombre1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nombre2",
        type: "uint256",
      },
    ],
    name: "setNombre2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const EXERCICE2_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "montantEther",
        type: "uint256",
      },
    ],
    name: "etherEnWei",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "montantWei",
        type: "uint256",
      },
    ],
    name: "weiEnEther",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
];

export const EXERCICE3_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "message",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "setMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "a",
        type: "string",
      },
      {
        internalType: "string",
        name: "b",
        type: "string",
      },
    ],
    name: "concatener",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "autre",
        type: "string",
      },
    ],
    name: "concatenerAvec",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "s",
        type: "string",
      },
    ],
    name: "longueur",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "a",
        type: "string",
      },
      {
        internalType: "string",
        name: "b",
        type: "string",
      },
    ],
    name: "comparer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
];

export const EXERCICE4_ABI = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "nombre",
        type: "int256",
      },
    ],
    name: "estPositif",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
];

export const EXERCICE5_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nombre",
        type: "uint256",
      },
    ],
    name: "estPair",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nombre",
        type: "uint256",
      },
    ],
    name: "parite",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
];

export const EXERCICE6_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nombres",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nombre",
        type: "uint256",
      },
    ],
    name: "ajouterNombre",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getElement",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "afficheTableau",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "calculerSomme",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getTaille",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const EXERCICE7_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "rectangle",
    outputs: [
      {
        internalType: "contract Rectangle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_y",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_longueur",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_largeur",
        type: "uint256",
      },
    ],
    name: "creerRectangle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRectangleAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const EXERCICE8_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "recipient",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    stateMutability: "payable",
    type: "receive",
    payable: true,
  },
  {
    inputs: [],
    name: "receivePayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getSender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRecipient",
        type: "address",
      },
    ],
    name: "changeRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Helper function to get ABI by contract name
export const getABI = (contractName) => {
  const abis = {
    Exercice1: EXERCICE1_ABI,
    Exercice2: EXERCICE2_ABI,
    Exercice3: EXERCICE3_ABI,
    Exercice4: EXERCICE4_ABI,
    Exercice5: EXERCICE5_ABI,
    Exercice6: EXERCICE6_ABI,
    Exercice7: EXERCICE7_ABI,
    Exercice8: EXERCICE8_ABI,
  };

  return abis[contractName] || [];
};
