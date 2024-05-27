/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import AddComment from "./functions/add_comment.ts";
import CreateCard from "./functions/create_card.ts";
import DeleteCard from "./functions/delete_card.ts";
import UnverifyCard from "./functions/unverify_card.ts";
import UpdateCard from "./functions/update_card.ts";
import VerifyCard from "./functions/verify_card.ts";

const Guru = {
  functions: {
    /**
     * @see The {@link https://api.slack.com/reference/connectors/guru/add_comment AddComment} documentation.
     */
    AddComment,
    /**
     * @see The {@link https://api.slack.com/reference/connectors/guru/create_card CreateCard} documentation.
     */
    CreateCard,
    /**
     * @see The {@link https://api.slack.com/reference/connectors/guru/delete_card DeleteCard} documentation.
     */
    DeleteCard,
    /**
     * @see The {@link https://api.slack.com/reference/connectors/guru/unverify_card UnverifyCard} documentation.
     */
    UnverifyCard,
    /**
     * @see The {@link https://api.slack.com/reference/connectors/guru/update_card UpdateCard} documentation.
     */
    UpdateCard,
    /**
     * @see The {@link https://api.slack.com/reference/connectors/guru/verify_card VerifyCard} documentation.
     */
    VerifyCard,
  },
} as const;

export default Guru;