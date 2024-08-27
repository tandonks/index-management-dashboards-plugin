/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ChangeEvent, useState } from "react";
import {
  EuiSmallButton,
  EuiCompressedFormRow,
  EuiCompressedComboBox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCompressedFieldNumber,
} from "@elastic/eui";
import "brace/theme/github";
import "brace/mode/json";
import { ISMTemplate as ISMTemplateData } from "../../../../../models/interfaces";
import { ISM_TEMPLATE_INPUT_MAX_WIDTH } from "../../utils/constants";

interface ISMTemplateProps {
  template: ISMTemplateData;
  onUpdateTemplate: (template: ISMTemplateData) => void;
  onRemoveTemplate: () => void;
  isFirst: boolean;
}

const ISMTemplate = ({ template, onUpdateTemplate, onRemoveTemplate, isFirst }: ISMTemplateProps) => {
  // TODO: Move this top top of form submition
  const [isInvalid, setInvalid] = useState(false);
  return (
    <EuiFlexGroup gutterSize="l" alignItems="center">
      <EuiFlexItem style={{ maxWidth: ISM_TEMPLATE_INPUT_MAX_WIDTH }}>
        <EuiCompressedFormRow isInvalid={false} error={null}>
          <EuiCompressedComboBox
            isClearable={false}
            placeholder="Add index patterns"
            noSuggestions
            selectedOptions={template.index_patterns.map((pattern) => ({ label: pattern }))}
            onChange={(selectedOptions) => {
              onUpdateTemplate({ ...template, index_patterns: selectedOptions.map(({ label }) => label) });
              setInvalid(false);
            }}
            onCreateOption={(searchValue) => {
              if (!searchValue.trim()) {
                return false;
              }

              if (searchValue.includes(" ")) {
                setInvalid(false);
                return;
              }

              onUpdateTemplate({ ...template, index_patterns: [...template.index_patterns, searchValue] });
            }}
            onSearchChange={(searchValue) => {
              if (!searchValue) {
                setInvalid(false);

                return;
              }

              if (searchValue.includes(" ")) {
                setInvalid(true);
                return;
              }
              //TODO
              setInvalid(false);
            }}
            isInvalid={isInvalid}
            data-test-subj="ism-template-index-pattern-input"
          />
        </EuiCompressedFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiCompressedFormRow error={null} isInvalid={false}>
          <EuiCompressedFieldNumber
            value={template.priority}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const priority = e.target.valueAsNumber;
              onUpdateTemplate({ ...template, priority });
            }}
            isInvalid={false}
            data-test-subj="ism-template-priority-input"
          />
        </EuiCompressedFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiSmallButton color="danger" onClick={onRemoveTemplate} data-test-subj="ism-template-remove-button">
          Remove
        </EuiSmallButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default ISMTemplate;
