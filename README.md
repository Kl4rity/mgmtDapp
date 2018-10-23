# mgmtDapp
A simple application allowing the management of organisations via the Ethereum Blockchain.

It should:
- allow a user to sign up
- allow a user to manage his account
  - it should store passwords safely
  - it should have functionality to restore passwords via email
  - it should allow a user to associate a public key with his account (and to prove ownership of that key)
- allow users to join organizations
- allow users to cast votes within an organisation
- allow users to create organizations
- allow users to managage organizations
- allow users to start a voting process

Optional:
- the voting logic should be separated into Solidity contracts living on an ethereum testnet
- sign-in should be possible by proving ownership of the address (public key) associated with the account

Technologies:
- React Frontend
- Materialize CSS
- HTTPS
- NodeJS backend
- MongoDB
- Docker containers / docker-compose for deployment
- Web3 for Chain-Interactions
