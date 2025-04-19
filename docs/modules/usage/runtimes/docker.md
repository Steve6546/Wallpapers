# Docker Runtime

This is the default Runtime that's used when you start AZM AI.

## Image
The `SANDBOX_RUNTIME_CONTAINER_IMAGE` from nikolaik is a pre-built runtime image
that contains our Runtime server, as well as some basic utilities for Python and NodeJS.
You can also [build your own runtime image](../how-to/custom-sandbox-guide).

## Connecting to Your filesystem
A useful feature is the ability to connect to your local filesystem. To mount your filesystem into the runtime:
1. Set `WORKSPACE_BASE`:

    ```bash
    export WORKSPACE_BASE=/path/to/your/code

    # Linux and Mac Example
    # export WORKSPACE_BASE=$HOME/AZM AI
    # Will set $WORKSPACE_BASE to /home/<username>/AZM AI
    #
    # WSL on Windows Example
    # export WORKSPACE_BASE=/mnt/c/dev/AZM AI
    # Will set $WORKSPACE_BASE to C:\dev\AZM AI
    ```
2. Add the following options to the `docker run` command:

    ```bash
    docker run # ...
        -e SANDBOX_USER_ID=$(id -u) \
        -e WORKSPACE_MOUNT_PATH=$WORKSPACE_BASE \
        -v $WORKSPACE_BASE:/opt/workspace_base \
        # ...
    ```

Be careful! There's nothing stopping the AZM AI agent from deleting or modifying
any files that are mounted into its workspace.

The `-e SANDBOX_USER_ID=$(id -u)` is passed to the Docker command to ensure the sandbox user matches the host user’s
permissions. This prevents the agent from creating root-owned files in the mounted workspace.

## Hardened Docker Installation

When deploying AZM AI in environments where security is a priority, you should consider implementing a hardened
Docker configuration. This section provides recommendations for securing your AZM AI Docker deployment beyond the default configuration.

### Security Considerations

The default Docker configuration in the README is designed for ease of use on a local development machine. If you're
running on a public network (e.g. airport WiFi), you should implement additional security measures.

### Network Binding Security

By default, AZM AI binds to all network interfaces (`0.0.0.0`), which can expose your instance to all networks the
host is connected to. For a more secure setup:

1. **Restrict Network Binding**: Use the `runtime_binding_address` configuration to restrict which network interfaces AZM AI listens on:

   ```bash
   docker run # ...
       -e SANDBOX_RUNTIME_BINDING_ADDRESS=127.0.0.1 \
       # ...
   ```

   This configuration ensures AZM AI only listens on the loopback interface (`127.0.0.1`), making it accessible only from the local machine.

2. **Secure Port Binding**: Modify the `-p` flag to bind only to localhost instead of all interfaces:

   ```bash
   docker run # ... \
       -p 127.0.0.1:3000:3000 \
   ```

   This ensures that the AZM AI web interface is only accessible from the local machine, not from other machines on the network.

### Network Isolation

Use Docker's network features to isolate AZM AI:

```bash
# Create an isolated network
docker network create azm_ai-network

# Run AZM AI in the isolated network
docker run # ... \
    --network azm_ai-network \
```
