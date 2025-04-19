from pydantic import SecretStr

from azm_ai.integrations.github.github_service import GitHubService
from azm_ai.integrations.gitlab.gitlab_service import GitLabService
from azm_ai.integrations.provider import ProviderType


async def validate_provider_token(token: SecretStr) -> ProviderType | None:
    """
    Determine whether a token is for GitHub or GitLab by attempting to get user info
    from both services.

    Args:
        token: The token to check

    Returns:
        'github' if it's a GitHub token
        'gitlab' if it's a GitLab token
        None if the token is invalid for both services
    """
    # Try GitHub first
    try:
        github_service = GitHubService(token=token)
        await github_service.get_user()
        return ProviderType.GITHUB
    except (ValueError, KeyError, ConnectionError) as e:
        # Specific errors that might occur during validation
        pass
    except Exception as e:
        # Log unexpected errors but continue to try GitLab
        from azm_ai.core.logger import azm_ai_logger as logger
        logger.warning(f"Unexpected error validating GitHub token: {e}")
        pass

    # Try GitLab next
    try:
        gitlab_service = GitLabService(token=token)
        await gitlab_service.get_user()
        return ProviderType.GITLAB
    except (ValueError, KeyError, ConnectionError) as e:
        # Specific errors that might occur during validation
        pass
    except Exception as e:
        # Log unexpected errors
        from azm_ai.core.logger import azm_ai_logger as logger
        logger.warning(f"Unexpected error validating GitLab token: {e}")
        pass

    return None
