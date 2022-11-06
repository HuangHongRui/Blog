import Anchor from "@/components/Anchor"
import { Box, Container, Grid, Typography } from "@mui/material"
import { useRef } from "react"

export default () => {
  const picRef = useRef(null);

  return (
    <Box className="min-h-screen" >
      <Grid container>
        <Grid ref={picRef} item xs={12} className="min-h-[50vh] bg-article-bg-img relative">
          <Anchor dom={picRef} />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md" className="my-14">
            <Typography variant="body2" gutterBottom>
              本文是 Systrace 线程 CPU 运行状态分析技巧系列的第一篇，主要分析了 Systrace 中 cpu 的 runnable 状态出现的原因和 Runnable 过长时的一些优化思路。
            </Typography>
            <br />
            <Typography variant="body2" gutterBottom>
              本系列的目的是通过 Systrace 这个工具，从另外一个角度来看待 Android 系统整体的运行，同时也从另外一个角度来对 Framework 进行学习。也许你看了很多讲 Framework 的文章，但是总是记不住代码，或者不清楚其运行的流程，也许从 Systrace 这个图形化的角度，你可以理解的更深入一些。Systrace 基础和实战系列大家可以在 Systrace 基础知识 - Systrace 预备知识 或者 博客文章目录 这里看到完整的目录
            </Typography>
            <br />
            <Typography variant="body2" gutterBottom>
              CPU 运行状态分析技巧系列节选自付费知识星球 The Performance 的「Android 性能优化 - 系统性课程」电子书，目前电子书正在每周更新中。付费知识星球 The Performance 是一个分享 Android 开发领域性能优化相关的圈子，主理人是三个国内一线手机厂商性能优化方面的一线开发者，有多年性能相关领域的知识积累和案例分析经验，可以提供性能、功耗分析知识的一站式服务，涵盖了基础、方法论、工具使用和最宝贵的案例分析，欢迎大家使用微信扫描 The Performance 知识星球简介 这篇文章中的二维码加入
            </Typography>
            <br/>
            <Typography variant="body2" gutterBottom>
              Systrace 线程 CPU 运行状态分析技巧 - Runnable 篇
            </Typography>
            <Typography variant="body2" gutterBottom>
              Systrace 线程 CPU 运行状态分析技巧 - Running 篇
            </Typography>
            <Typography variant="body2" gutterBottom>
              Systrace 线程 CPU 运行状态分析技巧 - Sleep 和 Uninterruptible Sleep 篇
            </Typography>
            <br/>
            <Typography id="Runnable 状态说明" variant="h6" gutterBottom>
              Runnable 状态说明
            </Typography>
            <Typography variant="button" gutterBottom>
              Runnable 状态在 Trace 中的显示方式
            </Typography>
            <br />
            <Typography variant="body2" gutterBottom>
              Perfetto/Systrace: 不同 CPU 运行状态异常原因 101 - Running 长 中讲解了导致 CPU 的 Running 状态耗时久的原因与优化方法，这一节介绍 Runnable 状态切换原理与对应的排查与优化思路。在 Systrace 中显示为蓝色，表示线程处于 Runnable，等待被 CPU 调度执行。
            </Typography>

            <Box className="my-4" component="img" alt="The house from the offer." src="/file/article.jpg" />

            <Typography variant="body2" gutterBottom>
              从图 2 可知，一个 CPU 核在某个时刻只能执行一个线程，因此所有待执行的任务都在一个「可执行队列」里排队，一个 CPU 核就有一个队列。能插入到这个队列里排队的，代表着这个线程除了 CPU 资源，其他资源均已获取，如 IO、锁、信号量等。处于「可执行队列」的时候，线程的状态就会被置为 RUNNABLE，也就是 Systrace 里看到的 Runnable 状态。
            </Typography>
            <br />
            <Typography variant="body2" gutterBottom>
              Linux 内核是通过赋予不同线程执行时间片并通过轮转的方式来达到同时执行多个线程的效果，因此当一个 Running 中的线程的时间片用完时（通常是 ms 级别）将此线程置为 Runnable，等待下一次被调度。也有比较特殊的情况，那就是抢占。有些高优先级的线程可以抢占当前执行的线程，而不必等到此线程的时间片到期。
            </Typography>
            <br/>
            <Typography variant="body2" gutterBottom>
              当一个 CPU 有多个核的时候显然可以多个核同时工作，这时候不必都在一个 CPU 核上排队，根据负载情况（也就是排队情况），将线程迁移到其他核执行是必要的操作。掌管这些调度策略的，是通过 Linux 的调度器来实现的，它具体通过多个调度类（Schedule Class）来管理不同线程的优先级，常见的有:
            </Typography>



          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}