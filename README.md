# Discord-Message-Automation
This repository contains two options for automating discord account messages. This is against the TOS, so show restraint and temperance utilizing these tasks. 

The `node_me_discord.js` file is meant to be ran with node; it will log every minute until the specified time, upon which it will send a message to the specified discord channel, with the specified discord account's authorization.

The `optional_version_discord.js` is much of the same, except that it does not loop itself in a repeating counting fashion. Instead, it executes once, sending the message, and that's it; this version is meant to be utilized in `crontab -e` with `'cron timer syntax' 'path to node, which you can find using the command "which node", or "which nodejs"' 'path to optional_version_discord.js'`
