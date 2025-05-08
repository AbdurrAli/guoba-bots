require("dotenv").config();
const katex = require("katex");
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
// Clients are the bots itself
// IntentsBitField are ...

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

client.on("ready", (c) => {
  console.log(`🦈 ${c.user.username} is online`);
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (msg.content === "ping") {
      msg.reply("ping");
    }
  } else {
    return;
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hello") {
    return interaction.reply(`Hello too ${interaction.user}`);
  } else if (interaction.commandName === "ping") {
    return interaction.reply(
      `pong ${interaction.client.ws.ping} ${interaction.user}`
    );
  }

  if (interaction.commandName === "standart-calculator") {
    function calculator(x, y, operand) {
      switch (operand) {
        case "+":
          return `The result ${x} + ${y} is **${x + y}**`;
          break;
        case "-":
          return `The result ${x} - ${y} is **${x - y}**`;
          break;
        case "*":
          return `The result ${x} x ${y} is **${x * y}**`;
          break;
        case "/":
          return `The result ${x} / ${y} is **${x / y}**`;
          break;
        case "%":
          return `The result ${x} mod ${y} is **${x % y}**`;
          break;
        default:
          break;
      }
    }
    const num1 = interaction.options.get("first-num").value;
    const num2 = interaction.options.get("second-num").value;
    const op = interaction.options.get("operator").value;

    const embeds = new EmbedBuilder()
      .setColor(0x90e0ef)
      .setTitle("Standard Calculator")
      .setDescription(calculator(num1, num2, op));
    interaction.reply({ embeds: [embeds] });
  }
});

client.login(process.env.TOKEN);
