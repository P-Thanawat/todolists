import { useMutation, useSubscription, } from "@apollo/client";
import { useContext, useEffect, useState } from 'react';
import { user } from '../service/localStorage'
import Navbar from "../component/Navbar";
import AddTodo from "../component/AddTodo";
import TodoCards from "../component/TodoCards";
import { ADD_TODO, CHECK_TODO, EDIT_TODO, REMOVE_TODO, SUB_TODO } from "../service/graphQL";
import { triggerContxet } from "../context/triggerContext";


function TodoList() {
  const [text, setText] = useState('')
  const { setTrigModal } = useContext(triggerContxet)

  // const { loading: loadingData, error, data, refetch } = useQuery(GET_LISTS, {});
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [checkTodo] = useMutation(CHECK_TODO);
  const [editTodo] = useMutation(EDIT_TODO);
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: async () => {
      setText('')
      // refetch();
    }
  });
  const { loading: loadingTodolists, data } = useSubscription(SUB_TODO, {
    onSubscriptionData: () => {
      setTrigModal(false)
    }
  });

  useEffect(() => {
    setTrigModal(true)
  }, [])


  return (
    <>
      <Navbar user={user} />
      <div className='container'>
        <h3 className='mb-3'>Todo Lists</h3>
        <AddTodo text={text} setText={setText} addTodo={addTodo} setTrigModal={setTrigModal} />
        <TodoCards data={data} checkTodo={checkTodo} editTodo={editTodo} deleteTodo={deleteTodo} loadingTodolists={loadingTodolists} setTrigModal={setTrigModal} />
      </div>
    </>
  )
}

export default TodoList
