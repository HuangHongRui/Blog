import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IosShareIcon from '@mui/icons-material/IosShare';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type dataTypes = { title: string, desc: string, hot: string, id: number };

const data: dataTypes[] = [
  {
    title: '11 月 4 日离岸人民币兑美元大涨 1500 点，创有记录以来最大单日涨幅，哪些信息值得关注？',
    desc: '11 月 4 日，随着美元指数大跌，离岸人民币兑美元继续扩大涨...',
    hot: '1117',
    id: 1
  },
  {
    title: '记者卧底「网课入侵」群，群员 00 后居多，男性占比超 7 成，「网课爆破」是否涉嫌违法犯罪？',
    desc: '调查动机 近日，河南省新郑市第三中学一名刘姓历史老师上网课后在家中不幸去世。据刘老师家属提供的视频和图片显示，刘老师在上网课时，直播间被人故意播放刺耳…',
    hot: '6667',
    id: 3
  },
  {
    title: '近年来，至少 1400 名美国华裔科学家转而到中国开展研究。如何看待新一轮的「归国潮」？',
    desc: '11月1日，著名科学家颜宁在2022深圳全球创新人才论坛的讲台上，抛出一个重磅消息： 辞去普林斯顿大学的教职，正式归国。从清华赴普林斯顿大学任教5年后…',
    hot: '99',
    id: 4
  },
  {
    title: '为什么在西方文化中，恶魔经常以山羊的形象出现？',
    desc: '古希腊、古埃及、北欧的神话和各类宗教基本都有山羊形象的恶魔。',
    hot: '12',
    id: 5
  },
  {
    title: '11 月起多地核酸检测收费，多人混检最低 3 元/人次，哪些信息值得关注？',
    desc: '近日，四川、甘肃、贵州等多地发布通知，11月起核酸检测要恢复收费。 收费标准如何?人民日报健康客户端根据各地发布通知及当地部门的回应，各地核酸检测收费…',
    hot: '3211',
    id: 6
  },
]

export default () => {
  const navigate = useNavigate();

  return (
    <Box className='mt-4 border-solid	border-2 rounded-sm mx-auto' sx={{ maxWidth: 1000 }} >
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

        {data.map(({ title, desc, hot, id }: dataTypes, index: number) => {
          return (
            <React.Fragment key={index} >
              <ListItem
                alignItems="flex-start" sx={{ height: 200 }}
                onClick={() => { navigate(`/article?id=${id}`); }}
              >
                <ListItemText
                  key={index}
                  primary={title}
                  className="flex flex-col h-full"
                  primaryTypographyProps={{
                    className: "text-lg leading-6 font-medium cursor-pointer hover:bg-gray-100",
                  }}
                  secondaryTypographyProps={{ className: "flex grow flex-col" }}
                  secondary={
                    <>
                      <Typography variant="overline" className="text-sm my-1 grow cursor-pointer">
                        {desc}
                      </Typography>
                      <Typography variant="overline" className="text-[16px]">
                        <LocalFireDepartmentIcon className="w-3.5 mb-[1px]" />
                        {hot} 热度
                        <Button variant="text" className="p-0 ml-2 text-[16px] cursor-pointer text-inherit mt-[-3px] font-normal">
                          <IosShareIcon className="w-3 mb-[2px]" />
                          分享
                        </Button>
                      </Typography>
                    </>
                  }
                />

              </ListItem>
              <Divider component="li" key={index} hidden={data.length === index + 1} />
            </React.Fragment>
          )
        })}

      </List>
    </Box>
  );
}
