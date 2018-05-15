/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

// @flow

import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { getSourceClassnames } from "../../utils/source";
import { getSourceMetaData } from "../../selectors";

import type { Source } from "../../types";
import type { SourceMetaDataType } from "../../reducers/ast";

import "./SourceIcon.css";

type Props = {
  source: Source,
  // sourceMetaData will provide framework information
  sourceMetaData: SourceMetaDataType,
  // Array of strings representing cases where we prefer to get no image
  renderNothingIfIncludes?: string[]
};

class SourceIcon extends PureComponent<Props> {
  render() {
    const { renderNothingIfIncludes, source, sourceMetaData } = this.props;
    const iconClass = getSourceClassnames(source, sourceMetaData);

    if (
      renderNothingIfIncludes &&
      renderNothingIfIncludes.includes(iconClass)
    ) {
      return null;
    }

    return <img className={`source-icon ${iconClass}`} />;
  }
}

export default connect((state, props) => {
  return {
    sourceMetaData: getSourceMetaData(state, props.source.id)
  };
})(SourceIcon);