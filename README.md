# whisky-book

Documentation for Whisky.

### How to Contribute

1. Clone into the repository
   ```
   git clone https://github.com/Whisky-App/whisky-book.git
   ```
2. cd into the directory
   ```
   cd whisky-book
   ```
3. Install [rust](https://www.rust-lang.org/tools/install)
4. Install mdbook and the required preprocessors
   ```
   cargo install mdbook
   cargo install mdbook-alerts
   cargo install mdbook-template
   cargo install mdbook-last-changed
   ```
5. Install [Node.js](https://nodejs.org/en/download/).
   You can also install it through [Homebrew](https://brew.sh/) with `brew install node`.
6. You can preview changes to the book with `mdbook serve --open`

### Adding Game Pages:
0. Standards to uphold:
   - Ensure proper grammar, capitalization, spelling, spacing, and general professionalism. Jokes and such are allowed, but lets prioritize helping others before all else.
   - Ensure accuracy. Don't upload misleading information, false reports, guesses, or improper research.
   - Cite your sources. Found a guide from somewhere else? Found a solution or other thing online? Provide a link in your page. This isn't a requirement that's going to get your PR rejected, but simply one that future-proofs things and ensures that if a game suddenly breaks, we can check our sources and see if there are any updates to the solutions found.
   - Add status ratings to your game based on the following scale. We leave this up to general author interpretation, but please make sure you're still following these general guidelines:

    | Status   | Description                                                                                    |
    |----------|------------------------------------------------------------------------------------------------|
    | Platinum | Game without any defects and runs perfectly.                                                   |
    | Gold     | Game can be configured to run perfectly and without any defects.                               |
    | Silver   | Game requires some configuration to run and or has minor defects.                              |
    | Bronze   | Game is very difficult to get working and/or has severe in-game issues that limit playability. |
    | Garbage  | Game does not work at all.                                                                     |
  
1. Create a new markdown file in `~/whisky-book/src/game-support` with the name of the game.
   - Format your file in all lowercase, using only alphabetical, numerical, and dash characters, and use abbreviations where possible. i.e:
   ```
   Metal Gear Solid V: The Phantom Pain -> mgs-5.md
   Persona 3 Reload -> p3r.md
   Star Wars Jedi: Fallen Order -> sw-fallen-order.md
   Geometry Wars 3: Dimensions Evolved -> gw3-dimensions-evolved.md
   ```
2. Add the following template to your markdown file. Ensure the date is properly formatted, leaving zeroes if the month or day is a single digit.
   ```
   # <Full Game Name Here>

   {{#template ../templates/rating.md status=<status> installs=<Yes/No> opens=<Yes/No>}}
   ```
   If your game is a Steam game, add this text at the **bottom** of the page. You can find the Steam ID of a game by going to it's Steam page. It will be the number in the URL bar between `/app/` and `/<game name>/`.
   ```
   {{#template ../templates/steam.md id=<steam_id>}}
   ```
   Ensure that you're replacing the <> tags with the proper values in order to comply with the wiki layout. Below is an example of what [Star Wars Jedi: Fallen Order](https://docs.getwhisky.app/game-support/sw-fallen-order.html) will look like, and what it will look like on the wiki.
   ```
   # Star Wars Jedi: Fallen Order

   {{#template ../templates/rating.md status=Gold installs=Yes opens=Yes}}
   
   ## Setup
   
   - Install in Steam as normal
   - In Whisky, find `SwGame-Win64-Shipping.exe` in the Program list and run it
   
   {{#template ../templates/steam.md id=1172380}}
   
   ```
   <img width="815" alt="Screenshot 2024-04-16 at 10 06 11 PM" src="https://github.com/Whisky-App/whisky-book/assets/161992562/d7d61b1a-5d02-4961-8ff5-b953c2a2fbe1">  
3. Run the `generate` script with `./scripts/generate.mjs` to update `SUMMARY.md`.
   This will also make the game appear in the sidebar of the book.
4. Create a pull request detailing the changes you made. Ensure that it's consise, yet readable and coherent.
   - You will need to create a fork of `whisky-book` and push your changes there before creating a PR. Once you've done that, then you can submit a PR to merge your fork with `main`.
5. Run `./scripts/lint.mjs` to ensure that your changes are properly formatted.
6. Sit back, wait for PR reviews, and make changes as necessary.

Have any questions about this process or anything Whisky-related? Stop by the [Discord](https://discord.gg/CsqAfs9CnM) and ask us a question! We're more than happy to help.

**Please do not ping Isaac for general support or requests to view your PR. He is a busy person, has likely seen what you have said/submitted, and will reply when he can.**
