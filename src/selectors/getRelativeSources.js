// @flow

import { getProjectDirectoryRoot, getSources } from "../selectors";
import type { OuterState } from "../reducers/types";
import type { Source } from "../types";
import { dropScheme } from "../utils/source";

export type RelativeSource = Source & {
  +relativeUrl: string
};

function getRelativeUrl(url, root) {
  const sourcePathSplit = url.split("/");

  if (!root) {
    return dropScheme(url);
  }

  return url.slice(url.indexOf(root) + root.length);
}

function formatSource(source: Source, root): RelativeSource {
  return {
    ...source,
    relativeUrl: getRelativeUrl(source.url, root)
  };
}

/*
 * Gets the sources that are below a project root
 */
export function getRelativeSources(state: OuterState): RelativeSource[] {
  const sources = getSources(state);
  const root = getProjectDirectoryRoot(state);

  return sources
    .valueSeq()
    .toJS()
    .filter(({ url }) => url && url.includes(root))
    .map(source => formatSource(source, root));
}
