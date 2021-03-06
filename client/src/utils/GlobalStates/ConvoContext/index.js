import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useSocket } from "../SocketProvider";
import reducer from "./reducer";
import { LOADING, UPDATE_CHAT } from "./action";

const ConvoContext = createContext();
const { Provider } = ConvoContext;

const ConvoProvider = ({ value = [], ...props }) => {
  // const socket = useSocket();
  const [conversations, convoDispatch] = useReducer(reducer, {
    conversations: [],
    chat: {},
    loading: false
  });

  return <Provider value={[conversations, convoDispatch]} {...props} />;
};

const useConvoContext = () => {
  return useContext(ConvoContext);
};

export { ConvoProvider, useConvoContext };
