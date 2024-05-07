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
        disableInThreads: {
          type: Schema.types.boolean,
          description: "Allow fetching message content from threaded replies",
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
      const THREAD_TS_REGEX = /thread_ts=[0-9\.]+/g

      //example messageLink: https://example.slack.com/archives/C01ABCDEFGH/p123456789012345
      //example threaded messageLink: https://example.slack.com/archives/C01ABCDEFGH/p123456789012345?thread_ts=123456789.012345&cid=C01234567
      const channelId = inputs.messageLink.split('/')[4]
      const msgTsRaw = inputs.messageLink.split('/')[5]
      const threadParent = msgTsRaw.match(THREAD_TS_REGEX)
      if (threadParent?.length && threadParent?.length > 1){
        return {
          error: `Bad message timestamp`,
        };
      }
      if (threadParent?.length == 1){
        if (inputs.disableInThreads){
          return {
            error: `This step is configured to only work on top-level messages`,
          };
        }
        const threadParentTs = threadParent[0].slice(10)
        const actualMsgTsRaw = msgTsRaw.split("?")[0]
        const msgTs = actualMsgTsRaw.slice(1,-6) + '.' + actualMsgTsRaw.slice(-6)
        
        const msgRes = await client.conversations.replies({    
          "channel": channelId,
          "ts": threadParentTs,
          "latest": msgTs,
          "limit": 1,
          "inclusive": true
        })
        console.log(msgRes)
        if (!msgRes.ok) {
          return {
            error: `Failed to fetch linked message: ${msgRes.error}`,
          };
        }
        //first message is always the thread parent. The result should only include that and the message we're searching for
        if (msgRes.messages?.length !== 2) {
          return {
            error: `Got an unexpected number of messsages back when fetching threaded message. Expecting 2, got ${msgRes.messages?.length ?? 0}`,
          };
        }
        return { outputs: { messageContent: msgRes.messages[1].text, messageContentRaw: msgRes.messages[1].text } };
      }else{
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
      }

  
      
    },
  );