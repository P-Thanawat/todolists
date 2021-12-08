import { gql } from "@apollo/client";
import { user } from '../service/localStorage'
const userId = user?.['https://hasura.io/jwt/claims']?.['x-hasura-user-id']

const REMOVE_TODO = gql`
  mutation MyMutation ($todoid : Int) {
    delete_todolists(where: {id: {_eq: $todoid}}) {
      returning {
        id
      }
    }
  }
  
`;

const ADD_TODO = gql`
  mutation MyMutation ($todo: String)  {
    insert_todolists(objects: {status: false, detail: $todo, user_id: ${userId}}) {
      returning {
        id
      }
    }
  }
  `;

const CHECK_TODO = gql`
  mutation MyMutation($todoid : Int,$status : Boolean) {
    update_todolists(where: {id: {_eq: $todoid}}, _set: {status: $status}) {
      returning {
        id
      }
    }
  }
  `;

const EDIT_TODO = gql`
  mutation MyMutation($todoid : Int,$newDetail : String) {
    update_todolists(where: {id: {_eq: $todoid}}, _set: {detail: $newDetail}) {
      returning {
        id
      }
    }
  }
  `;

const SUB_TODO =
  gql`
subscription MySubscription {
todolists(where: {user_id: {_eq: ${userId}}}, order_by: {createAt: desc}) {
createAt
detail
id
status
user {
  id
  email
}
user_id
}
}
`

const GET_LISTS = gql`
query MyQuery {
  todolists(where: {user_id: {_eq: ${userId}}}, order_by: {createAt: desc}) {
    status
    id
    detail
    createAt
    user {
      id
      email
    }
  }
}
`;



export { ADD_TODO, CHECK_TODO, EDIT_TODO, REMOVE_TODO, SUB_TODO, GET_LISTS }