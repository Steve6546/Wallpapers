from typing import Type

from azm_ai.security.analyzer import SecurityAnalyzer
from azm_ai.security.invariant.analyzer import InvariantAnalyzer

SecurityAnalyzers: dict[str, Type[SecurityAnalyzer]] = {
    'invariant': InvariantAnalyzer,
}
