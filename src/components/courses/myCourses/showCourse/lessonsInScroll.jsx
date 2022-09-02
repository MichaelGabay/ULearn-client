import {
  createTheme,
  ThemeProvider,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { blueGrey, grey, lime, red } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UPDATE_ORDER_ROUTE } from "../../../../shared/constant/url";
import { apiPost } from "../../../../shared/services/services";
import style from "./showCourse.module.css";
let dragItem = null;
let dragOverItem = null;

const custom = createTheme({
  palette: {
    primary: {
      main: grey["900"],
    },
    secondary: {
      main: grey["200"],
    },
    error: {
      main: red["A200"],
    },
    success: {
      main: blueGrey[800],
    },
    info: lime,
  },
});
export const LessonsInScroll = ({
  lesson,
  onLessonCick,
  index,
  lessons,
  setLessons,
  itemDragg,
  setItemDragg,
  itemOver,
  setItemOver,
  isDownOrUp,
  setIsDownOrUp,
  sy,
}) => {
  const [query] = useSearchParams();
  const handelSort = async () => {
    const lessonsAr = JSON.parse(JSON.stringify(lessons));
    const draggedItemContent = lessonsAr.splice(dragItem, 1)[0];
    lessonsAr.splice(dragOverItem, 0, draggedItemContent);
    dragItem = null;
    dragOverItem = null;
    setItemDragg(-1);
    setItemOver(-1);
    setLessons(lessonsAr);
    let { data } = await apiPost(
      UPDATE_ORDER_ROUTE + `?shortId=${query.get("shortId")}`,
      lessonsAr
    );
  };
  const hoverDrug = (e) => {
    if (sy != e.pageY) {
      if (sy < e.pageY) {
        setIsDownOrUp(true);
      }
      if (sy > e.pageY) {
        setIsDownOrUp(false);
      }
      sy = e.pageY;
    }
  };

  return (
    <div
    style={{whiteSpace:"pre-wrap",direction:"rtl"}}
      className={`${itemDragg == index && style.dargItem} ${
        itemOver == index &&
        itemOver != itemDragg &&
        isDownOrUp &&
        style.dragOverUp
      } ${
        itemOver == index &&
        itemOver != itemDragg &&
        !isDownOrUp &&
        style.dragOverDown
      } ${style.lesson}`}
      draggable
      onDragStart={(e) => {
        dragItem = index;
        setItemDragg(index);
      }}
      onDragEnter={(e) => {
        dragOverItem = index;
        setItemOver(index);
      }}
      onDragEnd={handelSort}
      onDragOver={(e) => hoverDrug(e)}
      onClick={() => {
        let lessonData = {
          name: lesson.name,
          info: lesson.info,
          link: lesson.link,
          _id: lesson._id,
          files_link: lesson.files_link,
        };
        onLessonCick(lessonData);
      }}
    >
      {lesson.name}
    </div>
  );
};
