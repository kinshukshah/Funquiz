import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { QuizReducerInitialStateType } from "../../context/QuizContext/quiz.types";
import { GetCurrentQuizList } from "../../utils/functions.utils";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { Button } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DisplayResults } from "../DisplayResults/DisplayResults.component";

export type ModelType = {
  open: boolean;
  quizInfo: QuizReducerInitialStateType | null;
};

export const UserQuizTable = ({
  tableData,
}: {
  tableData: QuizReducerInitialStateType[] | undefined;
}) => {
  const { quizList } = useQuiz();
  const [open, setOpen] = useState<ModelType>({ open: false, quizInfo: null });
  const handleClose = () => setOpen({ open: false, quizInfo: null });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Quiz Name</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Results</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((row, idx) => {
                const quiz =
                  quizList && GetCurrentQuizList(row.quizId, quizList);
                return (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {quiz?.quizName}
                    </TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => setOpen({ open: true, quizInfo: row })}
                      >
                        Results
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid #eee",
            boxShadow: 24,
            p: 4,
            transform: "translate(-50%, -50%)",
            height: 400,
            overflow: "scroll",
          }}
        >
          <DisplayResults resultData={open.quizInfo} resultAction={false} />
        </Box>
      </Modal>
    </>
  );
};
