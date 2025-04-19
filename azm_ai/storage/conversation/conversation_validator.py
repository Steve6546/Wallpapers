import os

from azm_ai.utils.import_utils import get_impl


class ConversationValidator:
    """Storage for conversation metadata. May or may not support multiple users depending on the environment."""

    async def validate(
        self, conversation_id: str, cookies_str: str
    ) -> tuple[None, None]:
        return None, None


def create_conversation_validator() -> ConversationValidator:
    conversation_validator_cls = os.environ.get(
        'AZM_AI_CONVERSATION_VALIDATOR_CLS',
        'azm_ai.storage.conversation.conversation_validator.ConversationValidator',
    )
    ConversationValidatorImpl = get_impl(
        ConversationValidator, conversation_validator_cls
    )
    return ConversationValidatorImpl()
