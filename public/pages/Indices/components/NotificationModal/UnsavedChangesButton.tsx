// FILE: UnsavedChangesButtons.tsx

import React, { useCallback, useRef, useState } from "react";
import { EuiButton, EuiButtonEmpty, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

interface UnsavedChangesButtonsProps {
  unsavedCount: number;
  formErrorsCount?: number;
  onClickCancel?: () => void;
  onClickSubmit: () => Promise<void>;
  submitButtonDataTestSubj?: string;
}

const UnsavedChangesButtons: React.FC<UnsavedChangesButtonsProps> = ({
  unsavedCount,
  formErrorsCount,
  onClickCancel,
  onClickSubmit,
  submitButtonDataTestSubj,
}) => {
  const [loading, setLoading] = useState(false);
  const destroyRef = useRef(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await onClickSubmit();
    } catch (e) {
    } finally {
      if (destroyRef.current) {
        return;
      }
      setLoading(false);
    }
  };

  const renderCancel = useCallback(
    () => (
      <EuiButtonEmpty onClick={onClickCancel} color="ghost" iconType="cross">
        Cancel
      </EuiButtonEmpty>
    ),
    [onClickCancel]
  );

  const renderConfirm = useCallback(
    () => (
      <EuiButton
        data-test-subj={submitButtonDataTestSubj}
        onClick={onClick}
        isLoading={loading}
        disabled={loading}
        iconType="check"
        color="primary"
        fill
        size="m"
      >
        Save
      </EuiButton>
    ),
    [onClick, submitButtonDataTestSubj, loading]
  );

  return (
    <EuiFlexGroup alignItems="center" justifyContent="flexEnd">
      {formErrorsCount ? (
        <EuiFlexItem grow={false}>
          <div className="ISM-unsaved-changes-blocks danger" />
          {formErrorsCount} form errors.
        </EuiFlexItem>
      ) : null}
      {unsavedCount && !formErrorsCount ? (
        <EuiFlexItem grow={false}>
          <div className="ISM-unsaved-changes-blocks warning" />
          {unsavedCount} unsaved changes.
        </EuiFlexItem>
      ) : null}
      <EuiFlexItem grow={false}>{renderCancel()}</EuiFlexItem>
      <EuiFlexItem grow={false}>{renderConfirm()}</EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default UnsavedChangesButtons;
