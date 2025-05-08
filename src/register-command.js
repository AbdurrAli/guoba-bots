require("dotenv").config();
const { REST, Routes, Options, ApplicationCommand, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "hello",
    description: "Greetings to users with Hello too",
  },
  {
    name: "ping",
    description: "Reply with pong !"
  },
  {
    name: "standart-calculator",
    description: "Calculate two value",
    options: [
      {
        name: "first-num",
        description: "the first number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "second-num",
        description: "the second number",
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: "operator",
        description: "operator for calculating",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "add",
            value: "+"
          },
          {
            name: "subtract",
            value: "-"
          },
          {
            name: "multiply",
            value: "*"
          },
          {
            name: "divide",
            value: "/"
          },
          {
            name: "modulus",
            value: "%"
          },
        ]
      },
    ]
  },
];

const rest = new REST({
  version: "10",
}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering commands ...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands
      }
    );
    console.log("Commands registered successfully ...");
  } catch (error) {
    console.error(`There was some error ${error}`);
  }
})();
