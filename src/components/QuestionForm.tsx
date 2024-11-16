"use client";

import React, { useEffect, useState } from "react";
import {TextField} from "@mui/material";

const QuestionForm = () => {
  const [answer, setAnswer] = useState("");

  return (
    <div>
      <h3>Theme: baby suits</h3>
      <p>{answer}</p>
      <textarea
        placeholder="Enter your business plan..."
        onChange={e => setAnswer(e.target.value)}
      />
    </div>
  );
};

export default QuestionForm;
