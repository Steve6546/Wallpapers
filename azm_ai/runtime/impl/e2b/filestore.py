from typing import Protocol

from azm_ai.storage.files import FileStore


class SupportsFilesystemOperations(Protocol):
    def write(self, path: str, contents: str | bytes) -> None: ...
    def read(self, path: str) -> str: ...
    def list(self, path: str) -> list[str]: ...
    def delete(self, path: str) -> None: ...
    def mkdir(self, path: str, recursive: bool = False) -> None: ...


class E2BFileStore(FileStore):
    def __init__(self, filesystem: SupportsFilesystemOperations) -> None:
        self.filesystem = filesystem

    def write(self, path: str, contents: str | bytes) -> None:
        self.filesystem.write(path, contents)

    def read(self, path: str) -> str:
        return self.filesystem.read(path)

    def list(self, path: str) -> list[str]:
        return self.filesystem.list(path)

    def delete(self, path: str) -> None:
        self.filesystem.delete(path)
        
    def mkdir(self, path: str, recursive: bool = False) -> None:
        """Create a directory at the specified path.
        
        Args:
            path: The path where to create the directory
            recursive: If True, create parent directories as needed
        """
        self.filesystem.mkdir(path, recursive)
