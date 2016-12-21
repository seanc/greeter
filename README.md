# kbve-bot

> Discord moderation and management bot for KBVE

## Installation

```sh
$ npm install -g seanc/kbve-bot
```

## Usage
Make sure `.kbvebotrc` is in the same directory when running the command

```sh
$ greeter
```

Example config
```ini
[bot]
token = Mj...
prefix = $

[greet]
message = Hello {{users}}, welcome to KBVE.
threshold = 5

[logging]
channel = 260651293356457984

[groups]
admin = 105120056215625728
```

| Key             | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| bot.token       | Bot token                                                            |
| bot.prefix      | Command prefix                                                       |
| greet.message   | Message format for welcoming users                                   |
| greet.threshold | For every (n) user, welcome them all                                 |
| logging.channel | Channel to log various data to, should be private                    |
| groups.admin    | List of user IDS you want to allow access to administrative commands |
## License

MIT © [Sean Wilson](https://imsean.me)
