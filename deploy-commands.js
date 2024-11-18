const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);



for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log('[WARNING] the command at ${filePath} is missing a required "data" of "execute" property.')
        }
    } 
}

const rest = new REST().setToken(process.env.TOKEN);

//Delete all global commands
// rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);

//Delete all guild commands
// rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();