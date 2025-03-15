# Using Steam with Whisky

## Install

Download the [.exe](https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe) file from the [Steam download page](https://store.steampowered.com/about/).
You should be able to run this via Whisky.

## Usage

- Steam will take a long time to open. This is expected.

## Fixes

### Downloads not completing

| Attribute | Description |
| --------- | ----------- |
| Working as of | Unknown |
| Source | Unknown |

- Restarting Steam when downloads hit 99% and get stuck can work.

### "Steam encountered an unexpected error during startup"

| Attribute | Description |
| --------- | ----------- |
| Working as of | 3/14/2025 |
| Source | [`@kuruae` on Discord](https://discord.com/channels/1115955071549702235/1224176817372659774/1303823720179040326), [this reddit comment](https://www.reddit.com/r/macgaming/comments/1gl55mn/comment/lvt4hu2/) |

Since Whisky has stopped being actively maintained, newer Steam versions are not
supported. If you cannot open Steam (instead being presented with a dialogue to
quit or restart steam), follow these instructions:

1. Press `Cmd-Shift-K` from the Whisky app or go to `File > Kill All Bottles`.

2. In your Whisky Steam configuration, add the following arguments:

    ```
    -forcesteamupdate -forcepackagedownload -overridepackageurl http://web.archive.org/web/20240520if_/media.steampowered.com/client -exitsteam
    ```

    This will restore an older Steam version.

3. Click the Run button to launch Steam. It will launch, show an update
   installer dialog, and then close.

4. Replace the arguments you added with the following arguments:

    ```
    -noverifyfiles -nobootstrapupdate -skipinitialbootstrap -norepairfiles -overridepackageurl
    ```

5. Click the Run button again. It should work.

Note that any shortcuts you have made will have to be removed and regenerated.
