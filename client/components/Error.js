// @flow
import React from 'react';

const Error = ({
    fields = []
}: { fields: Array<string> }) =>
    (
        <div id="error">
            <p>The following field(s) cannot be blank:</p>
            <ul>
                {
                    fields.map((field, i) =>
                        <li key={i}>{field}</li>
                    )
                }
            </ul>
        </div>
    );

export default Error;

