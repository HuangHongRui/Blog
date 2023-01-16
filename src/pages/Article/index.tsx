import { useRef } from "react"
import { getQuery } from "@/utils";
import { useRequest } from "ahooks";
import Anchor from "@/components/Anchor"
import { fetchBlog } from "@/service/blogs";
import { Box, Container, Grid, Typography } from "@mui/material"
import Style from './index.module.less'
import { marked } from "marked";

export default () => {
  const picRef = useRef(null);
  const query = getQuery()
  const { data = {} }: any = useRequest(() => fetchBlog(query))
  const { title, content = '' } = data
  console.log(data,1,  marked.parse(content))

  return (
    <Box className="min-h-screen" >
      <Grid container>
        <Grid ref={picRef} item xs={12} className="min-h-[50vh] bg-article-bg-img relative">
          <Anchor dom={picRef} />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth='lg' className="my-14">
            <article
              className={`markdown-body grow min-w-[50%] overflow-auto ${Style['markdown-wrap']}`}
              dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
            />
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}