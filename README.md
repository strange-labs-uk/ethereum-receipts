## ethereum_receipts

## build

```bash
$ make build
```

## start

```bash
$ make start
```

Open [http://localhost](http://localhost) in your browser.

## design

The overall design of the system:

```

  api servers    browser 
    -> geth        -> metamask

      |            |
      |            |
      \           /

  controller contract

          |
          |

  storage contract
```


## storage contract

Used for underlying storage - this is the stateful contract and should never
need updating.

It has a simple `map[string]string` structure and does not understand the 
structure of keys

#### state

 * `values` - `map[string]string`
 * `controllerAddress` - `address`

#### methods

```
function write(key, value) {
  if(sender.address != controllerAddress) return
  values[key] = value
}

function updateControllerAddress(address) {
  if(sender.address != contract.owner) return
  controllerAddress = address
}
```


## controller contract

#### data structure

The underlying key structure for receipts:

```
owner + previousHash + contentHash
```

#### properties

 * `storageContractAddress` - `address`

#### methods

```

function findReceipts(field, value) {
  let results = []
  for (key, content in storage.values) {
    const {owner, previousHash, contentHash} = receipt = key.split()
    receipt.content = receipt
    if(key == 'owner' && owner == value) results.push(receipt)
    if(key == 'previousHash' && previousHash == value) results.push(receipt)
    if(key == 'contentHash' && contentHash == value) results.push(receipt)
  }
  return results
}

function findReceipt(field, value) {
  results = findReceipts(field, value)
  return results[0]
}

function loadReceiptChain(id) {
  let currentChain = findReceipt('contentHash', id)
  let results = [currentChain]

  while(currentChain.previousHash) {
    currentChain = findReceipt('contentHash', currentChain.previousHash)
    results.unshift(currentChain)
  }
  return results
}

function loadAllChains(owner) {
  const allReceipts = findReceipts('owner', owner)
  let receipts = {}
  let chains = {}

  // TODO: work out how to return an array of chains where
  // each item is the last thing in the chain
}

function getOwner() {
  return sender.data.apiKey || sender.address
}

function create(content, previousHash) {
  const owner = getOwner()
  const contentHash = sha256(content)
  if(previousHash) {
    const previousReceipt = findReceipt('previousHash', previousHash)
    if(previousReceipt.owner != owner) return
  }
  else {
    previousHash sha256('')
  }
  storage.write([owner, previousHash, contentHash].join(':'), content)
}

function updateControllerAddress(address) {
  if(sender.address != contract.owner) return
  controllerAddress = address
}
```

## start linked to template stack

If you are wanting to edit templtestack whilst hot reloading - then:

```bash
$ make dev
$ make frontend.cli
$ yarn run watch
```