# GameTest API changelog generator
 
This repository generates GameTest API changelog.

## Raw Data
A script is made to obtain every javascript components from GameTest runtime in Minecraft. The script / add-on is not released to the public.

- `raw` folder contains each release version (and the latest preview version) of GameTest API.

- **(Coming soon)** `raw-beta` folder contains beta / preview versions of GameTest API, mainly for public archive.

- `mojang` JSON files in `types` directory includes component types in GameTest modules, they are fetched in Minecraft version 1.18.30.

## Generated
- `generated` folder contains changelog JSON and text files that are generated by the script file `scripts/index.js`.

- `types/dist` directory contains values of GameTest components

The `types` folder has code that generates a list of variable types from GameTest Framework modules, the feature is being experimented.

`behavior_pack` folder contains the script that generates GameTest components in Minecraft ingame.