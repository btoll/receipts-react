import { gql } from 'apollo-boost';

const getReceiptsQuery = gql`
    {
        receipts {
            id
            store_id
            total_cost
            purchase_date
        }
    }
`;

export {
    getReceiptsQuery
};

