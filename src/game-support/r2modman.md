## r2modman

{{#template ../templates/rating.md status=Silver date=2/27/24 installs=Yes opens=Yes}}

(thank you to 1halon on the discord for writing this up!)
- Install in Steam as normal
- Start the game so Steam install the requirements
- Download the standalone executable from https://github.com/ebkr/r2modmanPlus/releases/latest into the Bottle's C drive (or some arbitary location Bottle can access to)
  - Pin the program -> Open Config (by right clicking pinned program)
  - Add `--disable-gpu --no-sandbox` into arguments
  - Add environment variable with key as `WINEDLLOVERRIDES` and value as `libglesv2=d`
    > [!WARNING]
    > If app opens with blank screen check environment variable because it may not get saved in the first try.

> [!NOTE]
> In regards of BegInExPack, install `winhttp` through `Winetricks > DLLs` or override `winhttp` to `Native then Builtin` from `Wine Configuration` (console may not show up)

> [!NOTE]
> In regards of DXVK, you can try to use `ESync` instead of `MSync` for `Enhanced Sync`