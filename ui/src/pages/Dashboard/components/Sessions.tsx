import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { IconButton } from "@mui/material";
import { ChevronRight, Delete } from "@mui/icons-material";
import { Sessions } from "../Dashboard";
import dayjs from "dayjs";

type SessionsProp = {
  sessions: Sessions[];
  handleDeleteSession: (sessionId: string) => void;
  handleContinueSession: (session: Sessions) => void;
};

const SessionsScreen: React.FC<SessionsProp> = ({
  sessions,
  handleDeleteSession,
  handleContinueSession,
}) => {
  return (
    <React.Fragment>
      <Title>Recent Game Sessions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Remove Session</TableCell>
            <TableCell align="right">Continue Session</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.name}</TableCell>
              <TableCell>
                {dayjs(session.createdDate).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleDeleteSession(session.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleContinueSession(session)}
                >
                  <ChevronRight />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default SessionsScreen;
