from unittest.mock import AsyncMock, patch

import pytest

from azm_ai.server.listen_socket import azm_action, azm_user_action


@pytest.mark.asyncio
async def test_azm_user_action():
    """Test that azm_user_action correctly forwards data to the conversation manager."""
    connection_id = 'test_connection_id'
    test_data = {'action': 'test_action', 'data': 'test_data'}

    # Mock the conversation_manager
    with patch('azm_ai.server.listen_socket.conversation_manager') as mock_manager:
        mock_manager.send_to_event_stream = AsyncMock()

        # Call the function
        await azm_user_action(connection_id, test_data)

        # Verify the conversation manager was called with the correct arguments
        mock_manager.send_to_event_stream.assert_called_once_with(
            connection_id, test_data
        )


@pytest.mark.asyncio
async def test_azm_action():
    """Test that azm_action (legacy handler) correctly forwards data to the conversation manager."""
    connection_id = 'test_connection_id'
    test_data = {'action': 'test_action', 'data': 'test_data'}

    # Mock the conversation_manager
    with patch('azm_ai.server.listen_socket.conversation_manager') as mock_manager:
        mock_manager.send_to_event_stream = AsyncMock()

        # Call the function
        await azm_action(connection_id, test_data)

        # Verify the conversation manager was called with the correct arguments
        mock_manager.send_to_event_stream.assert_called_once_with(
            connection_id, test_data
        )
