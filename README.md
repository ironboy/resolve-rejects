# reslolve-rejects 1.0.0

Resolve rejected promises, simplifiying await,
so you don't have to take care of catching rejections


### Example

```
// Two functions that return promises - one resolves, one rejects

let r = require('./resolve-rejects');

async function resolver(x){
  return x * 2;
}

function rejector(x){
  return new Promise((res, rej) => rej(x * 3));
}

// Test of resolve-reject
async function test(){
  let a = await resolver(2).r;
  let b = await rejector(2).r;
  console.log(a);
  if(a.err){
    console.log('Bad luck an error/rejection on calling resolver');
  }
  console.log(b);
  if(b.err){
    console.log('Bad luck an error/rejection on calling rejector');
  }
}

test();
```

### Settings
