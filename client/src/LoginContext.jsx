import { createContext, useState } from "react";

export default createContext(null);

export const SessionState = {
    NotConnected: 0,
    Connected: 1,
    Admin: 2,
};
