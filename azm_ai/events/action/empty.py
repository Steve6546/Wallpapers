from dataclasses import dataclass

from azm_ai.core.schema import ActionType
from azm_ai.events.action.action import Action


@dataclass
class NullAction(Action):
    """An action that does nothing."""

    action: str = ActionType.NULL

    @property
    def message(self) -> str:
        return 'No action'
