from dataclasses import dataclass

from azm_ai.events.event import Event


@dataclass
class Observation(Event):
    content: str
