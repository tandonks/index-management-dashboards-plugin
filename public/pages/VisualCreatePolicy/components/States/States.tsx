/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ChangeEvent } from "react";
import {
  EuiSmallButton,
  EuiText,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiLink,
  EuiIcon,
  EuiEmptyPrompt,
  EuiCompressedFormRow,
  EuiSelect,
  EuiPanel,
} from "@elastic/eui";
import { ContentPanel } from "../../../../components/ContentPanel";
import "brace/theme/github";
import "brace/mode/json";
import { Policy, State as StateData } from "../../../../../models/interfaces";
import { STATES_DOCUMENTATION_URL } from "../../../../utils/constants";
import State from "./State";

interface StatesProps {
  onOpenFlyout: () => void;
  policy: Policy;
  onClickEditState: (state: StateData) => void;
  onClickDeleteState: (idx: number) => void;
  onChangeDefaultState: (event: ChangeEvent<HTMLSelectElement>) => void;
  isReadOnly: boolean;
  useNewUx?: boolean;
}

const States = ({
  onOpenFlyout,
  policy,
  onClickEditState,
  onClickDeleteState,
  onChangeDefaultState,
  isReadOnly = false,
  useNewUx,
}: StatesProps) => {
  const paddingStyle = useNewUx ? { padding: "0px 0px" } : { padding: "5px 0px" };
  return !useNewUx ? (
    <ContentPanel
      bodyStyles={{ padding: "initial" }}
      title={`States (${policy.states.length})`}
      titleSize="s"
      subTitleText={
        <EuiText color="subdued" size="s" style={paddingStyle}>
          <p style={{ fontWeight: 200 }}>
            You can think of policies as state machines. "Actions" are the operations ISM performs when an index is in a certain state.
            <br />
            "Transitions" define when to move from one state to another.{" "}
            <EuiLink href={STATES_DOCUMENTATION_URL} target="_blank" rel="noopener noreferrer">
              Learn more
            </EuiLink>
          </p>
        </EuiText>
      }
    >
      <div style={{ padding: "0px 10px" }}>
        {!isReadOnly && (
          <>
            <EuiCompressedFormRow style={{ maxWidth: "300px", padding: "15px" }} isInvalid={false} error={null}>
              <EuiSelect
                compressed
                prepend="Initial state"
                options={policy.states.map((state) => ({ text: state.name, value: state.name }))}
                value={policy.default_state}
                onChange={onChangeDefaultState}
              />
            </EuiCompressedFormRow>
            <EuiSpacer size="s" />
            <EuiHorizontalRule margin="none" />
          </>
        )}

        <EuiFlexGroup gutterSize="none" direction="column">
          {policy.states.map((state, idx) => (
            <EuiFlexItem key={state.name}>
              <State
                idx={idx}
                state={state}
                isInitialState={state.name === policy.default_state}
                onClickEditState={onClickEditState}
                onClickDeleteState={onClickDeleteState}
                isReadOnly={isReadOnly}
              />
              <EuiHorizontalRule margin="none" />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>

        {!isReadOnly &&
          (!!policy.states.length ? (
            <>
              <EuiSpacer />
              <EuiSmallButton onClick={onOpenFlyout} data-test-subj="states-add-state-button">
                Add state
              </EuiSmallButton>
            </>
          ) : (
            <EuiEmptyPrompt
              title={<h2>No states</h2>}
              titleSize="s"
              body={<p>Your policy currently has no states defined. Add states to manage your index lifecycle.</p>}
              actions={
                <EuiSmallButton color="primary" onClick={onOpenFlyout} data-test-subj="states-add-state-button">
                  Add state
                </EuiSmallButton>
              }
            />
          ))}
      </div>
    </ContentPanel>
  ) : (
    <EuiPanel>
      <EuiFlexGroup gutterSize="xs" alignItems="center">
        <EuiText size="s">
          <h2>{`States (${policy.states.length})`}</h2>
        </EuiText>
      </EuiFlexGroup>

      <EuiText color="subdued" size="xs" style={paddingStyle}>
        <p style={{ fontWeight: 350 }}>
          You can think of policies as state machines. "Actions" are the operations ISM performs when an index is in a certain state.
          <br />
          "Transitions" define when to move from one state to another.{" "}
          <EuiLink href={STATES_DOCUMENTATION_URL} target="_blank" rel="noopener noreferrer">
            Learn more
          </EuiLink>
        </p>
      </EuiText>
      <EuiHorizontalRule margin={"xs"} />
      <EuiSpacer size="s" />
      <div>
        {!isReadOnly && (
          <>
            <EuiCompressedFormRow style={{ maxWidth: "300px" }} isInvalid={false} error={null}>
              <EuiSelect
                compressed
                prepend="Initial state"
                options={policy.states.map((state) => ({ text: state.name, value: state.name }))}
                value={policy.default_state}
                onChange={onChangeDefaultState}
              />
            </EuiCompressedFormRow>
            <EuiSpacer size="s" />
            <EuiHorizontalRule margin={"xs"} />
          </>
        )}

        <EuiFlexGroup gutterSize="none" direction="column">
          {policy.states.map((state, idx) => (
            <EuiFlexItem key={state.name}>
              <State
                idx={idx}
                state={state}
                isInitialState={state.name === policy.default_state}
                onClickEditState={onClickEditState}
                onClickDeleteState={onClickDeleteState}
                isReadOnly={isReadOnly}
              />
              <EuiHorizontalRule margin="none" />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>

        {!isReadOnly &&
          (!!policy.states.length ? (
            <>
              <EuiSpacer />
              <EuiSmallButton onClick={onOpenFlyout} data-test-subj="states-add-state-button">
                Add state
              </EuiSmallButton>
            </>
          ) : (
            <EuiEmptyPrompt
              title={<h3>No states</h3>}
              titleSize="s"
              body={<p>Your policy currently has no states defined. Add states to manage your index lifecycle.</p>}
              actions={
                <EuiSmallButton color="primary" onClick={onOpenFlyout} data-test-subj="states-add-state-button">
                  Add state
                </EuiSmallButton>
              }
            />
          ))}
      </div>
    </EuiPanel>
  );
};

export default States;
