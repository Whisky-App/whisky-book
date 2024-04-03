# r2modman

{{#template ../templates/rating.md status=Silver date=02/27/24 installs=Yes opens=Yes}}

## Setup

(thank you to 1halon on the discord for writing this up!)
- Download the standalone executable from [https://github.com/ebkr/r2modmanPlus/releases/latest](https://github.com/ebkr/r2modmanPlus/releases/latest) into the Bottle's C drive (or some arbitary location Bottle can access to)
- Pin the program, right click, Open Config
- Add `--disable-gpu --no-sandbox` into arguments
- Add environment variable with key `WINEDLLOVERRIDES` and value `libglesv2=d`
> [!WARNING]
> If app opens with a blank screen, check environment variable as it may not get saved in the first try.

> [!NOTE]
> If using the BepInEx framework, install `winhttp` through `Winetricks > DLLs` or override `winhttp` to `Native then Builtin` from `Wine Configuration` (console may not show up)

> [!NOTE]
> Use `ESync` instead of `MSync` for `Enhanced Sync`