# Requirements
from azm_ai.runtime.plugins.agent_skills import (
    AgentSkillsPlugin,
    AgentSkillsRequirement,
)
from azm_ai.runtime.plugins.jupyter import JupyterPlugin, JupyterRequirement
from azm_ai.runtime.plugins.requirement import Plugin, PluginRequirement
from azm_ai.runtime.plugins.vscode import VSCodePlugin, VSCodeRequirement

__all__ = [
    'Plugin',
    'PluginRequirement',
    'AgentSkillsRequirement',
    'AgentSkillsPlugin',
    'JupyterRequirement',
    'JupyterPlugin',
    'VSCodeRequirement',
    'VSCodePlugin',
]

ALL_PLUGINS = {
    'jupyter': JupyterPlugin,
    'agent_skills': AgentSkillsPlugin,
    'vscode': VSCodePlugin,
}
