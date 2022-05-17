require("./diff"); console.log("Generated API changes.")
require("./changelogGenerator"); console.log("Generated Changelog.")

const finished = `
The following files have been created:
- \`generated/changelog.json\` - GameTest changelog in JSON format
- \`generated/mojang-gametest.txt\` - mojang-gametest changelog in txt file
- \`generated/mojang-minecraft.txt\` - mojang-minecraft changelog in txt file
- \`generated/mojang-minecraft-ui.txt\` - mojang-minecraft-ui changelog in txt file
- \`generated/mojang-minecraft-server-admin.txt\` - mojang-minecraft-server-admin changelog in txt file`

console.log(finished)