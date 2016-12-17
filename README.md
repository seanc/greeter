# greeter

> Discord bot that greets new users and asks them predefined questions

## Installation

```sh
$ npm install -g seanc/greeter
```

## Usage
Make sure `.greeterrc` is in the same directory when running the command

```sh
$ greeter
```

Example config
```json
{
  "token": "Mj...",
  "guild": "",
  "verificationChannel": "",
  "questions": [
    "What is your username?",
    "What ranks do you have?",
    "What groups are you in?",
    "What name colors do you have, if any?"
  ]
}
```

| Key                 | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| token               | Discord bot token                                            |
| guild               | Guild ID you'd like to listen on for new members             |
| verificationChannel | Channel name excluding hashtag to send verification requests |
| questions           | An array of questions to ask                                 |

## License

MIT © [Sean Wilson](https://imsean.me)
