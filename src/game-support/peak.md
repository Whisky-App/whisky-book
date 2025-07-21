# PEAK
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Silver installs=Yes opens=Yes}}

## Installation

If you're using the older version of steam (because of the steam 3008 error), you'll need to install the game through the MAC version of steam.

Assuming you already have the Mac version of steam and have it installed (latest version):

1. Open MAC Steam
2. In any browser, type `steam://open/console`
3. In the console, type the following commands: `@sSteamCmdForcePlatformType windows` and `app_install 3527290`
4. Once installed, right click on the game in your library and click on "Browse local files".
5. In the Finder window steam opened, navigate back to `steamapps` (folder).
6. Open Whisky and open C drive, navigate to `drive_c/Program\ Files\ (x86)/Steam/steamapps`.
7. On the Mac `steamapps` You should see a file called `appmanifest_3527290.acf`. Drag this file to the WINDOWS version of `steamapps` (whisky)
8. Navigate back to `steamapps/common` on Mac steam and drag the folder "PEAK" to Whisky `steamapps/common`.
9. Restart Whisky steam and you should see the game in your library.

## Launch Options

Tested both DXVK, Metal, ESync, MSync. You are only able to launch using Vulkan, otherwise it'll just give a Unity crash error.

## Graphics Glitches

FLASH WARNING!

Certain assets in the game will start flashing/blinking, assets include your hat, backback, wood (logs), some mountains on some levels, most rocks on Alpine level.

{{#template ../templates/steam.md id=3527290}}
