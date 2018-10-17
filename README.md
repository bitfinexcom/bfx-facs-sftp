# bfx-facs-base

git clone https://github.com/bitfinexcom/REPO.git REPO

git remote -v

git remote add upstream https://github.com/bitfinexcom/PARENT.git

git remote -v

git push origin master

## Example config

```
{
  host: '127.0.1',
  port: '22',
  username: 'bitfinex',
  password: '1234'
}
```


## Example Usage
Please make sure that your SFTP server has root access to its
directory.

#### Create directory

```
this.sftp.mkdir('./hello_world_2')
  .then(console.log)

// undefined
```

#### List directory

```
this.sftp.list('/')
  .then(console.log)

/*
[ { type: 'd',
    name: 'hello_world',
    size: 0,
    modifyTime: 1539607160000,
    accessTime: 1539607160000,
    rights: { user: 'rw', group: 'rw', other: 'rw ' },
    owner: 0,
    group: 0 },
  { type: 'd',
    name: 'hello_world_2',
    size: 0,
    modifyTime: 1539608708000,
    accessTime: 1539608708000,
    rights: { user: 'rw', group: 'rw', other: 'rw ' },
    owner: 0,
    group: 0 } ]
*/
```

#### Fast put file

```
this.sftp.fastPut('./README.md', './hello_worlds')
  .then(console.log)

// ./README.md was successfully uploaded to ./hello_worlds!
```

#### Fast get file

```
this.sftp.fastGet('./hello_worlds', './hellow_worlds')
  .then(console.log)

// ./hello_worlds was successfully download to ./hellow_worlds!
```

#### Delete file

```
this.sftp.delete('./hello_worlds')
  .then(console.log)

// undefined
```

#### Chmod

```
this.sftp.chmod('./hello_world', 700)
  .then(console.log)

// undefined
```

For more info on how to use the this.sftp module, refer to the ssh2-this.sftp-client docs:
https://github.com/jyu213/ssh2-this.sftp-client