import { throttle } from 'lodash';
import { isVisible } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { List, ListItem, useMediaQuery } from "@mui/material";

export default ({ dom }: { dom: any }) => {
  const [isFixed, setFixed] = useState(false);
  const [isHidden, setHidden] =  useState(false);
  const isShow = useMediaQuery('(min-width:1400px)', { noSsr: true });

  const scrollChange = useCallback(
    throttle(() => {
      const isFixed = isVisible(dom?.current);
      setFixed(!isFixed)
    }, 100)
    , []);

  useEffect(() => {
    window.addEventListener('scroll', scrollChange)
    return () => window.removeEventListener('scroll', scrollChange)
  }, [])

  useEffect(() => {
    setHidden(!isShow)
  }, [isShow])

  return (
    <List
      dense={true}
      hidden={isHidden}
      disablePadding={true}
      className={`right-20 ${isFixed ? 'fixed top-10' : 'absolute top-[116%]'}`}
    >
      <ListItem>目录-1</ListItem>
      <ListItem>目录-2</ListItem>
      <ListItem>目录-3</ListItem>
      <ListItem>目录-4</ListItem>
    </List>
  );
}