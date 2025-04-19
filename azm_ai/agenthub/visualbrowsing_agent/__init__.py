from azm_ai.agenthub.visualbrowsing_agent.visualbrowsing_agent import (
    VisualBrowsingAgent,
)
from azm_ai.controller.agent import Agent

Agent.register('VisualBrowsingAgent', VisualBrowsingAgent)
