/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import CreateTransition from "./CreateTransition";
import { UITransition } from "../../../../../models/interfaces";

describe("<CreateTransition /> spec", () => {
  it("renders the component", () => {
    const transition: UITransition = { id: "some_id", transition: { state_name: "hot", conditions: { min_index_age: "30d" } } };
    const transitions = [transition];
    const { container } = render(
      <CreateTransition
        editTransition={transition}
        transitions={transitions}
        onCloseCreateTransition={() => {}}
        onClickSaveTransition={() => {}}
        stateOptions={["hot", "warm", "cold"]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});