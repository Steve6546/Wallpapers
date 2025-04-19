from dataclasses import dataclass, field

from azm_ai.storage.data_models.conversation_metadata import ConversationMetadata


@dataclass
class ConversationMetadataResultSet:
    results: list[ConversationMetadata] = field(default_factory=list)
    next_page_id: str | None = None
