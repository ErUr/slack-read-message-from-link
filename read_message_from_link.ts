import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ReadMessageFromLinkDefinition = DefineFunction({
    callback_id: "read_message_from_link",
    title: "Read message from link",
    description: "Reads the message content from a given Slack message link and makes it available to subsequent steps",
    source_file: "read_message_from_link.ts",
    input_parameters: {
      properties: {
        messageLink: {
          type: Schema.types.string,
          description: "Link to Slack message",
        },
      },
      required: ["messageLink"],
    },
    output_parameters: {
      properties: {
        messageContent: {
          type: Schema.slack.types.rich_text,
          description: "Slack message text read from the link",
        },
        messageContentRaw: {
          type: Schema.types.string,
          description: "Slack message text read from the link but without applied formatting",
        },
      },
      required: ["messageContent", "messageContentRaw"],
    },
  });
  
export default SlackFunction(
    ReadMessageFromLinkDefinition,
    async ({ inputs, client }) => {
      //example messageLink: https://example.slack.com/archives/C01ABCDEFGH/p123456789012345
      const channelId = inputs.messageLink.split('/')[4]
      const msgTsRaw = inputs.messageLink.split('/')[5]
      const msgTs = msgTsRaw.slice(1,-6) + '.' + msgTsRaw.slice(-6)
      const msgRes = await client.conversations.history({    
        "channel": channelId,
        "latest": msgTs,
        "limit": 1,
        "inclusive": true
      })
      if (!msgRes.ok) {
        return {
          error: `Failed to fetch linked message: ${msgRes.error}`,
        };
      }
  
      return { outputs: { messageContent: msgRes.messages[0].text, messageContentRaw: msgRes.messages[0].text } };
    },
  );