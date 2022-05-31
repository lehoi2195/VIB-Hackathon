import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TodosSlice from '../../ReduxSaga/todo';

export default function index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TodosSlice.actions.fetch());
  }, []);

  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}
