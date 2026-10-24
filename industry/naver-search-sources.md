# Naver 搜索 API 信源

Naver 新闻和博客没有统一的 RSS，本站用 [Naver 搜索 API](https://developers.naver.com/docs/serviceapi/search/news/news.md) 按关键词抓。请求要带 Client ID 和 Client Secret，**密钥不能进仓库**，所以这类信源不写进 `sources.json`，在后台“信源 → 新建”里建：类型选 `json_list`，把下面的配置粘进“采集配置（JSON）”，把两处 `填这里` 换成自己的密钥，先点“预览抓取”核对再创建。

密钥在 <https://developers.naver.com> 注册应用、勾选“검색”后拿到，免费，每天 25,000 次。下面一个信源一小时最多抓 4 次，十几个信源一天也只用几百次。

## 新闻

```json
{
  "url": "https://openapi.naver.com/v1/search/news.json?query=%EC%83%9D%EC%84%B1%ED%98%95%20AI&display=50&sort=date",
  "mode": "json_api",
  "headers": { "X-Naver-Client-Id": "填这里", "X-Naver-Client-Secret": "填这里" },
  "itemsPath": "items",
  "titlePaths": ["title"],
  "urlTemplate": "{raw:originallink}",
  "urlTemplateFallback": "{raw:link}",
  "summaryPaths": ["description"],
  "publishedAtPath": "pubDate"
}
```

- `pubDate` 自带时区（`Fri, 23 Oct 2026 09:00:00 +0900`），不用设 `publishedAtUtcOffset`。
- `originallink` 是媒体自己的原文地址，有时为空；为空时用 `urlTemplateFallback` 退回 Naver 新闻页 `link`。
- 分级 `T2`，参与方式 `editorial`。

## 博客

```json
{
  "url": "https://openapi.naver.com/v1/search/blog.json?query=%ED%94%84%EB%A1%AC%ED%94%84%ED%8A%B8&display=50&sort=date",
  "mode": "json_api",
  "headers": { "X-Naver-Client-Id": "填这里", "X-Naver-Client-Secret": "填这里" },
  "itemsPath": "items",
  "titlePaths": ["title"],
  "urlTemplate": "{raw:link}",
  "summaryPaths": ["description"],
  "authorPaths": ["bloggername"],
  "publishedAtPath": "postdate",
  "publishedAtUnit": "yyyymmdd",
  "publishedAtUtcOffset": "+09:00",
  "itemUrlPrefixRewrite": { "from": "https://blog.naver.com/", "to": "https://m.blog.naver.com/" }
}
```

- `postdate` 只有日期（`20261023`），按韩国时间的当天零点记。
- 电脑版博客页（`blog.naver.com/…`）的正文在 iframe 里，抓回来只有一个空壳；手机版（`m.blog.naver.com/…`）的 HTML 里就有正文，所以把链接改写成手机版。
- 分级 `T2`，参与方式 `editorial`。博客噪声多（体验团、推广、课程招生），靠 `prompts/selection-score.md` 压分。

Cafe（`cafearticle.json`）不带发布时间，先不接。

## 关键词

`query=` 后面是 URL 编码的关键词。一个关键词建一个信源，ID 和名称建议这样写（名称里全角括号中的部分只给后台看）：

| ID | 名称 | 接口 | 关键词 | `query=` |
|---|---|---|---|---|
| `naver-news-genai` | Naver 新闻（생성형 AI） | `news.json` | 생성형 AI | `%EC%83%9D%EC%84%B1%ED%98%95%20AI` |
| `naver-news-ai` | Naver 新闻（인공지능） | `news.json` | 인공지능 | `%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5` |
| `naver-news-llm` | Naver 新闻（LLM） | `news.json` | LLM | `LLM` |
| `naver-blog-prompt` | Naver 博客（프롬프트） | `blog.json` | 프롬프트 | `%ED%94%84%EB%A1%AC%ED%94%84%ED%8A%B8` |
| `naver-blog-chatgpt` | Naver 博客（ChatGPT） | `blog.json` | ChatGPT | `ChatGPT` |
| `naver-blog-claude` | Naver 博客（Claude） | `blog.json` | Claude | `Claude` |
| `naver-blog-genai` | Naver 博客（생성형 AI） | `blog.json` | 생성형 AI | `%EC%83%9D%EC%84%B1%ED%98%95%20AI` |

预览时核对：标题里的 `<b>` 已去掉、`&quot;` 已变回引号；新闻的链接是媒体原文（个别是 `n.news.naver.com`）；博客的链接是 `m.blog.naver.com`；日期和 Naver 上显示的一致。
