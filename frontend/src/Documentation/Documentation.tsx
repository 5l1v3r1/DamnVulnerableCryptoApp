import { Box, Paper } from "@material-ui/core";
import * as hljs from 'highlight.js';
import "highlight.js/styles/github.css";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router";
import ApiRequest from "../Common/ApiRequest";
import { DocumentationService } from "./DocumentationService";
import useStyles from "./styles";


const fixImagesInDev = () => {
  // check if running on dev, because if so, since the images come from backend
  // and backend is in a different url we need to change the url of the image
  if (process?.env?.NODE_ENV === 'development') {
    const currentPort = window.location.port || "80";

    document.querySelectorAll("img").forEach(img => {
      img.src = img.src.replace(`:${currentPort}/`, `:${ApiRequest.serverPort()}/`);
    });
  }
};

const Documentation = () => {

  const [documentation, setDocumentation] = useState("");
  const classes = useStyles();
  const { topic } = useParams();

  useEffect(() => {

    DocumentationService.getDocumentation(topic).then((res: string) => {
      setDocumentation(res);
      hljs.initHighlighting();
    });

  }, []);

  useEffect(() => {
    fixImagesInDev();
  }, [documentation]);

  return (
    <Box>
      <Paper>
        <ReactMarkdown className={classes.root} source={documentation} />
      </Paper>
    </Box >
  );
};

export default Documentation;