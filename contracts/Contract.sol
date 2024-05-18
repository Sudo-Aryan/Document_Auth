// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/Chainlink.sol";

contract Certification {
    using Strings for string;
    bytes32 private constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 private constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    address private admin;

    constructor() {
        admin = msg.sender;
    }

    struct Certificate {
        string doc_Id;
        string doc_Hash;
        string issuedTo;
        string issuedBy;
        string course_name;
        uint256 timestamp;
        bool auth;
    }

    struct Account {
        string useraddress;
        string instituteName;
        string email;
        string password;
        bytes32 role;
        bool user;
    }

    mapping(bytes32 hash => Certificate) private certificates;
    mapping(address => Account) private users;

    event CertificateGenerated(bool message, uint256 timestamp);

    function createUser(
        string memory _role,
        string memory _instituteName,
        string memory _email,
        string memory _password
    ) public returns (bool) {
        address user_address = msg.sender;
        require(
            user_address != admin,
            "You are not authorised to change the admin role"
        );
        bytes32 Role = keccak256(abi.encodePacked(_role));
        require(
            users[user_address].role != Role,
            "The account has already been assigned a role!! Contact the admin company for changing or revoking role"
        );
        users[user_address].useraddress = Strings.toHexString(user_address);
        users[user_address].instituteName = _instituteName;
        users[user_address].email = _email;
        users[user_address].password = _password;
        users[user_address].role = Role;
        users[user_address].user = true;
        return true;
    }

    function stringToByteConversion(
        string memory input
    ) private pure returns (bytes32 result) {
        bytes memory temp = bytes(input);
        if (temp.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(input, 32))
        }
    }

    function generateCertificate(
        string memory _doc_hash,
        string memory _issuedTo,
        string memory _courseName
    ) public returns (bool) {
        address user_address = msg.sender;
        require(
            users[user_address].role == ISSUER_ROLE,
            "Error: Only issuers can generate certificates."
        );

        bytes32 hash = stringToByteConversion(_doc_hash);

        require(hash.length > 0, "Error: Document hash cannot be empty!!!");
        require(
            !Strings.equal(certificates[hash].doc_Hash, _doc_hash),
            "Error: Certificate with the same hash already exists!"
        );

        string memory doc_Id = string(
            abi.encodePacked(_doc_hash, user_address)
        );

        emit CertificateGenerated(true, block.timestamp);
        certificates[hash] = Certificate(
            doc_Id,
            _doc_hash,
            _issuedTo,
            users[user_address].useraddress,
            _courseName,
            block.timestamp,
            true
        );
        return true;
    }

    function getAndVerifyCertificateData(
        string memory _hash
    )
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        address user_address = msg.sender;
        require(
            users[user_address].role == VERIFIER_ROLE,
            "Error: Only verifiers can access certificate data."
        );

        bytes32 hash = stringToByteConversion(_hash);

        require(certificates[hash].auth, "Error: No such document exists.");

        Certificate memory temp = certificates[hash];
        return (
            user_address,
            temp.doc_Hash,
            temp.issuedTo,
            temp.issuedBy,
            temp.course_name,
            temp.timestamp,
            true
        );
    }

    function getAccountDetails(
        address _accountAddress
    )
        public
        view
        returns (
            string memory userAddress,
            string memory instituteName,
            string memory email,
            string memory pass,
            bytes32 role
        )
    {
        require(
            msg.sender == admin,
            "Only admin is allowed to get account details"
        );
        return (
            users[_accountAddress].useraddress,
            users[_accountAddress].instituteName,
            users[_accountAddress].email,
            users[_accountAddress].password,
            users[_accountAddress].role
        );
    }
}