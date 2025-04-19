from dataclasses import dataclass

from azm_ai.core.schema import ObservationType
from azm_ai.events.observation.observation import Observation


@dataclass
class MCPObservation(Observation):
    """This data class represents the result of a MCP Server operation."""

    observation: str = ObservationType.MCP

    @property
    def message(self) -> str:
        return self.content
