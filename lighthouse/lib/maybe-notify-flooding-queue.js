const { WebClient } = require("@slack/web-api");
const countAuditing = require("./count-auditing");

module.exports = async db => {
  if (!process.env.SLACK_TOKEN || !process.env.SLACK_CHANNEL) return;

  const count = await countAuditing(db);
  if (count < 100) return;
  
  const level = msg < 200 ? 'WARNING' : '*CRITICAL*';
  const msg = `${level}: queue is increasing`;
  const web = new WebClient(process.env.SLACK_TOKEN);
  
  await web.chat.postMessage({
    channel: process.env.SLACK_CHANNEL,
    text: `[Lighthouse integration] ${msg} (${count})`
  });
};
