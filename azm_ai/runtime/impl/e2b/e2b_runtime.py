from typing import Callable

from azm_ai.core.config import AppConfig
from azm_ai.events.action import (
    FileReadAction,
    FileWriteAction,
)
from azm_ai.events.observation import (
    ErrorObservation,
    FileReadObservation,
    FileWriteObservation,
    Observation,
)
from azm_ai.events.stream import EventStream
from azm_ai.runtime.base import Runtime
from azm_ai.runtime.impl.e2b.filestore import E2BFileStore
from azm_ai.runtime.impl.e2b.sandbox import E2BSandbox
from azm_ai.runtime.plugins import PluginRequirement
from azm_ai.runtime.utils.files import insert_lines, read_lines


class E2BRuntime(Runtime):
    def __init__(
        self,
        config: AppConfig,
        event_stream: EventStream,
        sid: str = 'default',
        plugins: list[PluginRequirement] | None = None,
        sandbox: E2BSandbox | None = None,
        status_callback: Callable | None = None,
    ):
        super().__init__(
            config,
            event_stream,
            sid,
            plugins,
            status_callback=status_callback,
        )
        if sandbox is None:
            self.sandbox = E2BSandbox()
        if not isinstance(self.sandbox, E2BSandbox):
            raise ValueError('E2BRuntime requires an E2BSandbox')
        self.file_store = E2BFileStore(self.sandbox.filesystem)

    def read(self, action: FileReadAction) -> Observation:
        content = self.file_store.read(action.path)
        lines = read_lines(content.split('\n'), action.start, action.end)
        code_view = ''.join(lines)
        return FileReadObservation(code_view, path=action.path)

    def write(self, action: FileWriteAction) -> Observation:
        if action.start == 0 and action.end == -1:
            self.file_store.write(action.path, action.content)
            return FileWriteObservation(content='', path=action.path)
        files = self.file_store.list(action.path)
        if action.path in files:
            all_lines = self.file_store.read(action.path).split('\n')
            new_file = insert_lines(
                action.content.split('\n'), all_lines, action.start, action.end
            )
            self.file_store.write(action.path, ''.join(new_file))
            return FileWriteObservation('', path=action.path)
        else:
            # Create a new file if it doesn't exist
            try:
                # Create parent directories if they don't exist
                import os
                parent_dir = os.path.dirname(action.path)
                if parent_dir:
                    # Check if parent directory exists in the file store
                    parent_dirs = self.file_store.list(parent_dir)
                    if not parent_dirs and parent_dir != '/':
                        # Create parent directories recursively
                        self.file_store.mkdir(parent_dir, recursive=True)
                
                # Write the content to the new file
                self.file_store.write(action.path, action.content)
                from azm_ai.core.logger import azm_ai_logger as logger
                logger.info(f"Created new file: {action.path}")
                return FileWriteObservation('', path=action.path, created=True)
            except Exception as e:
                from azm_ai.core.logger import azm_ai_logger as logger
                logger.error(f"Failed to create file {action.path}: {e}")
                return ErrorObservation(f'Failed to create file: {action.path}. Error: {str(e)}')
