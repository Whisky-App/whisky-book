# Using Steam with Whisky

## Install

Download the [.exe](https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe) file from the [Steam download page](https://store.steampowered.com/about/).
You should be able to run this via Whisky.

## Usage

- Steam will take a long time to open. This is expected.
- The interface can often be buggy or unresponsive. With enough patience,
  however, you can message friends, invite them to games, search your library,
  etc.

## Fixes

### Downloads not completing

Restart Steam if downloads become stuck. If they remain stuck, try changing your bottle
settings from MSync to ESync, then restarting Steam.

### "Steam encountered an unexpected error during startup (0x3008)"

Since Whisky has stopped being actively maintained, newer Steam versions are not
supported. If you cannot open Steam (instead being presented with a dialog to
quit or restart steam), follow these instructions:

1. Press `Cmd-Shift-K` from the Whisky app or go to `File > Kill All Bottles` in
   the menu bar.

2. In your Whisky Steam configuration, add the following arguments:

   **The link will not open in a browser, however, it is still active.**
 
    ```
    -forcesteamupdate -forcepackagedownload -overridepackageurl http://web.archive.org/web/20250306194830if_/media.steampowered.com/client -exitsteam
    ```

    This will restore an older Steam version from 3/6/2025. Running an outdated
    version of Steam is not recommended by Valve due to possible security risks. Proceed at your own risk.

3. Click the Run button to launch Steam. It will launch, show an update
   installer dialog, and then close.

4. Replace the arguments you added with the following arguments:

    ```
    -noverifyfiles -nobootstrapupdate -skipinitialbootstrap -norepairfiles -overridepackageurl
    ```

5. Click the Run button again. It should work.

Note that any shortcuts you have made will have to be removed and regenerated.

#### "This fix doesn't work :("

If it still doesn't work, then create a new bottle and reinstall Steam there.
You can delete your old bottle if you don't need it anymore.
