
import * as H from 'history';
import { ReactNode } from "react";
import { match } from "react-router-dom";

export interface MainHeaderProps {
    children?: ReactNode;
    title?: string;
    back?: string;
    lastPage?: string;
    match: match;
    location: H.Location;
    history: H.History;
  }