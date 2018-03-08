# reslolve-rejects 1.0.2

Resolve rejected promises, simplifiying await,
so you don't have to take care of catching rejections

### Usage
Instead of writing:

```javascript
await functionThatReturnsAPromise();
```

write

```javascript
await functionThatReturnsAPromise().r;
```

and protect yourself from runtime errors if the promise should reject.

### Example

```javascript
/// Two functions that return promises - one resolves, one rejects

let resolveRejects = require('resolve-rejects');

async function func_a(x){
  return x * 2;
}

function func_b(x){
  return new Promise((res, rej) => rej(x * 3));
}


// Test of resolve-reject

async function test(){

  let a = await func_a(2).r;
  console.log(a);
  if(a.err){
    console.log('Bad luck - an error/rejection on calling func_a');
  }

  let b = await func_b(2).r;
  console.log(b);
  if(b.err){
    console.log('Bad luck - an error/rejection on calling func_b');
  }

}


// Test of resolve-reject with non-standard settings

async function test2(){

  resolveRejects.settings({propName: 'resrej'});
  resolveRejects.settings({errorPropName: 'error'});

  let a = await func_a(2).resrej;
  console.log(a);
  if(a.error){
    console.log('Bad luck - an error/rejection on calling func_a');
  }

  let b = await func_b(2).resrej;
  console.log(b);
  if(b.error){
    console.log('Bad luck - an error/rejection on calling func_b');
  }
}


// Run tests

async function runTests(){
  console.log('Test 1');
  await test();
  console.log('\nTest 2');
  await test2();
}

runTests();
```

### Settings
