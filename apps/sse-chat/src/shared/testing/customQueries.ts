import {
  queryHelpers,
  buildQueries,
  Matcher,
  MatcherOptions,
} from '@testing-library/react';

import { ATTR } from './selector';

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataMessageAuthorRole = (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions | undefined,
) =>
  queryHelpers.queryAllByAttribute(
    ATTR.MESSAGE_AUTHOR_ROLE,
    container,
    id,
    options,
  );

const getMultipleError = (
  c: Element | null,
  DataMessageAuthorRoleValue: Matcher,
) =>
  `Found multiple elements with the ${ATTR.MESSAGE_AUTHOR_ROLE} attribute of: ${DataMessageAuthorRoleValue}`;
const getMissingError = (
  c: Element | null,
  DataMessageAuthorRoleValue: Matcher,
) =>
  `Unable to find an element with the ${ATTR.MESSAGE_AUTHOR_ROLE} attribute of: ${DataMessageAuthorRoleValue}`;

const [
  queryByDataMessageAuthorRole,
  getAllByDataMessageAuthorRole,
  getByDataMessageAuthorRole,
  findAllByDataMessageAuthorRole,
  findByDataMessageAuthorRole,
] = buildQueries(
  queryAllByDataMessageAuthorRole,
  getMultipleError,
  getMissingError,
);

export {
  queryByDataMessageAuthorRole,
  queryAllByDataMessageAuthorRole,
  getByDataMessageAuthorRole,
  getAllByDataMessageAuthorRole,
  findAllByDataMessageAuthorRole,
  findByDataMessageAuthorRole,
};
