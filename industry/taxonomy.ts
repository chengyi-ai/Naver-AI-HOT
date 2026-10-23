// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * tagColor 是飞书推送卡片里跟在标题后面的这一类小标签的颜色（飞书 text_tag 的颜色名）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "tutorial", tagColor: "green", label: "教学", feedLabel: "AI 教学", section: "教学", guide: "读者能照着学会一件事的教程、讲解、上手指南和实战复盘：用什么、分几步、注意什么，包括把 AI 用进工作、学习、副业的具体做法。重点是一段可以跟着做的过程；只贴一段提示词归提示词，只介绍一个工具好不好用归工具与服务。", commentary: true },
  { key: "prompt", tagColor: "turquoise", label: "提示词", section: "提示词", guide: "可以直接复制或改写使用的提示词、提示词写法和提问技巧、“这样问效果更好”的对比经验，以及别人做好的 GPTs、Skill、Agent 配置和工作流模板。重点是提示词或配置本身。" },
  { key: "tool", tagColor: "orange", label: "工具与服务", feedLabel: "AI 工具与服务", section: "工具与服务", guide: "值得一试的 AI 网站、应用、插件和开源工具（包括 Wrtn、Liner、AskUp 这类韩国本土服务）的推荐、实测、对比和使用体验，重点是读者能拿来用的东西和它解决什么问题。厂商自己宣布新模型、新功能的新闻归新品发布。" },
  { key: "release", tagColor: "indigo", label: "新品发布", feedLabel: "AI 新品发布", section: "新品发布", guide: "厂商宣布的新模型、新版本、权重开放，以及 AI 产品、功能、API 的上线、改版和价格变化（HyperCLOVA X、EXAONE、Kanana、GPT、Claude、Gemini……）。重点是这次发布本身；玩家上手实测和体验归工具与服务，教人怎么用归教学。" },
  { key: "industry", tagColor: "purple", label: "韩国动态", feedLabel: "韩国 AI 动态", section: "韩国动态", guide: "已经发生的 AI 公司经营、融资并购、合作、人事、诉讼、政策与监管（AI 基本法、主权 AI 项目、政府预算），以及对行业走向的分析和观点，以韩国为主；海外公司的这类大事也归这里。发布新产品归新品发布；新闻由当事人发出、带有态度，也不因此变成观点。" },
] as const satisfies ReadonlyArray<{ key: string; tagColor: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布（AI 行业是新模型）：日报报头的“N 个新模型”、改分类后修订已出的报告都按它数。
 * category 是类别，tag 是标签，两者都对上才算；unit 接在数字后面。
 * 没有这样一类的行业设成 null，报头就不显示这个数。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = { category: "release", tag: "模型发布", unit: "个新模型" };

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = ["ai", "api", "llm", "gpu", "agi", "ceo", "ipo"];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["model_release", "product_launch", "tool_or_prompt", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "教学/教程", "提示词", "Skill/配置", "网站/工具", "实测/评测", "使用体验", "模型发布", "产品更新", "开源/仓库", "行业动态", "政策/监管", "现象/观点",
  "非AI/通用工具", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "Agent", "编码", "推理", "多模态", "语音", "视频", "图像生成", "RAG", "端侧", "数据/训练", "搜索", "部署/工程", "开源生态", "具身智能", "MCP/工具调用", "自动化", "写作/办公", "学习/教育", "副业/营销",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = ["Naver", "Kakao", "LG", "Samsung", "SKT", "Upstage", "OpenAI", "Anthropic", "Google", "Meta", "Microsoft", "DeepSeek", "xAI", "Hugging Face", "GitHub"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  教程: "教学/教程", 教学: "教学/教程", 指南: "教学/教程", 玩法: "教学/教程", 技巧: "教学/教程", 实践: "教学/教程", 最佳实践: "教学/教程", "教程/实践": "教学/教程", "教程/玩法": "教学/教程", 使用方法: "教学/教程",
  prompt: "提示词", prompts: "提示词", 提示: "提示词", 提示语: "提示词", 프롬프트: "提示词",
  skill: "Skill/配置", skills: "Skill/配置", 技能: "Skill/配置", 配置: "Skill/配置", 工作流: "Skill/配置", gpts: "Skill/配置",
  工具: "网站/工具", 网站: "网站/工具", 应用: "网站/工具", 插件: "网站/工具", 推荐: "网站/工具", 服务: "网站/工具",
  "open-source": "开源/仓库", 开源: "开源/仓库", 仓库: "开源/仓库", repo: "开源/仓库",
  评测: "实测/评测", 实测: "实测/评测", 测评: "实测/评测", 跑分: "实测/评测", "评测/基准": "实测/评测", 对比: "实测/评测",
  体验: "使用体验", 吐槽: "使用体验", 反馈: "使用体验", 后记: "使用体验",
  发布: "模型发布", 模型: "模型发布", 产品: "产品更新", 更新: "产品更新",
  行业: "行业动态", 动态: "行业动态", 融资: "行业动态", 收购: "行业动态", 投资: "行业动态", 并购: "行业动态", 合作: "行业动态", 公司动态: "行业动态", "合作/生态": "行业动态", "融资/收购": "行业动态",
  政策: "政策/监管", 监管: "政策/监管", 法规: "政策/监管",
  观点: "现象/观点", 趋势: "现象/观点", 现象: "现象/观点", 讨论: "现象/观点", 大佬观点: "现象/观点", "现象/趋势": "现象/观点",
  论文: "现象/观点", 研究: "现象/观点", "论文/研究": "现象/观点",
  视频生成: "视频", 教育: "学习/教育", 学习: "学习/教育", 营销: "副业/营销", 副业: "副业/营销", 办公: "写作/办公", 写作: "写作/办公",
  非ai: "非AI/通用工具", "non-ai": "非AI/通用工具", 通用工具: "非AI/通用工具",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；orgNames 是这家公司发消息时开头用的组织名（公司、实验室、团队），
 * 在它自己的主题页上读者知道说的是谁，可以省去；otherNames 是公司的其他称呼（官方账号名、子品牌）。
 * 所有这些名字都用来认出说的是哪家公司，比如把事实的主体对到发布方。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; orgNames?: string[]; otherNames?: string[] }> = {
  naver: { name: "Naver", displayTag: "Naver", aliases: ["Naver", "네이버", "HyperCLOVA X", "CLOVA"], orgNames: ["NAVER Cloud", "Naver Cloud", "네이버클라우드", "NAVER", "Naver", "네이버"], otherNames: ["하이퍼클로바X", "클로바", "CLOVA X", "Cue:", "큐:", "D2"] },
  kakao: { name: "Kakao", displayTag: "Kakao", aliases: ["Kakao", "카카오", "Kanana"], orgNames: ["Kakao", "카카오"], otherNames: ["카나나", "카카오톡", "KakaoTalk"] },
  lg: { name: "LG AI 研究院", displayTag: "LG", aliases: ["LG AI Research", "LG AI연구원", "EXAONE"], orgNames: ["LG AI Research", "LG AI연구원", "LG"], otherNames: ["엑사원", "LG CNS", "LG전자"] },
  samsung: { name: "Samsung", displayTag: "Samsung", aliases: ["Samsung", "삼성", "三星", "Gauss"], orgNames: ["Samsung Research", "삼성리서치", "Samsung Electronics", "삼성전자", "Samsung", "삼성", "三星"], otherNames: ["삼성 가우스", "Galaxy AI", "갤럭시 AI", "Samsung SDS", "삼성SDS"] },
  skt: { name: "SK Telecom", displayTag: "SKT", aliases: ["SK Telecom", "SKT", "SK텔레콤", "A.X"], orgNames: ["SK Telecom", "SK텔레콤", "SKT"], otherNames: ["에이닷", "A.", "SK하이닉스"] },
  kt: { name: "KT", displayTag: null, aliases: ["KT", "믿:음", "Mi:dm"], orgNames: ["KT"], otherNames: ["믿음"] },
  upstage: { name: "Upstage", displayTag: "Upstage", aliases: ["Upstage", "업스테이지", "Solar"], orgNames: ["Upstage", "업스테이지"], otherNames: ["솔라"] },
  wrtn: { name: "Wrtn 뤼튼", displayTag: null, aliases: ["Wrtn", "뤼튼"], orgNames: ["Wrtn Technologies", "뤼튼테크놀로지스", "뤼튼"] },
  ncsoft: { name: "NC AI", displayTag: null, aliases: ["NC AI", "NCSOFT", "엔씨소프트", "VARCO"], orgNames: ["NC AI", "NCSOFT", "엔씨소프트", "엔씨"], otherNames: ["바르코"] },
  "world-labs": { name: "World Labs", displayTag: null, aliases: ["World Labs"] },
  "thinking-machines": { name: "Thinking Machines Lab", displayTag: null, aliases: ["Thinking Machines"] },
  amd: { name: "AMD", displayTag: null, aliases: ["AMD", "Advanced Micro Devices"] },
  openai: { name: "OpenAI", displayTag: "OpenAI", aliases: ["OpenAI", "ChatGPT", "Sora", "Codex", "GPT"], orgNames: ["OpenAI", "오픈AI"], otherNames: ["OpenAI Developers", "챗GPT", "챗지피티"] },
  anthropic: { name: "Anthropic", displayTag: "Anthropic", aliases: ["Anthropic", "Claude"], orgNames: ["Anthropic", "앤트로픽", "앤스로픽"], otherNames: ["Claude Code", "클로드"] },
  google: { name: "Google", displayTag: "Google", aliases: ["Google", "DeepMind", "Gemini", "谷歌"], orgNames: ["Google DeepMind", "Google Research", "Google", "DeepMind", "谷歌", "구글"], otherNames: ["Google AI", "Google Labs", "Google Cloud"] },
  deepseek: { name: "DeepSeek", displayTag: "DeepSeek", aliases: ["DeepSeek", "深度求索"], orgNames: ["DeepSeek", "深度求索"] },
  qwen: { name: "千问 Qwen", displayTag: null, aliases: ["Qwen", "通义", "阿里"], orgNames: ["通义千问", "通义实验室", "阿里巴巴", "阿里云", "阿里", "Qwen Team", "Qwen", "Alibaba"], otherNames: ["千问", "千问APP", "Alibaba Cloud"] },
  kimi: { name: "Kimi / 月之暗面", displayTag: null, aliases: ["Kimi", "月之暗面", "Moonshot"], orgNames: ["Moonshot AI", "月之暗面", "Kimi"] },
  minimax: { name: "MiniMax", displayTag: null, aliases: ["MiniMax", "海螺"], orgNames: ["MiniMax", "稀宇科技"] },
  zhipu: { name: "智谱 GLM", displayTag: null, aliases: ["智谱", "GLM", "Z.ai"], orgNames: ["智谱AI", "智谱", "Zhipu AI", "Z.ai"], otherNames: ["Zhipu"] },
  xai: { name: "xAI", displayTag: "xAI", aliases: ["xAI", "Grok"], orgNames: ["SpaceX Super Intelligence", "SpaceXAI", "SpaceXSI", "xAI"], otherNames: ["Grok Bot"] },
  meta: { name: "Meta", displayTag: "Meta", aliases: ["Meta", "Llama"], orgNames: ["Meta Superintelligence Labs", "Meta AI", "Meta"], otherNames: ["AI at Meta", "Muse"] },
  microsoft: { name: "Microsoft", displayTag: "Microsoft", aliases: ["Microsoft", "微软", "Copilot"], orgNames: ["Microsoft Research", "Microsoft AI", "Microsoft", "微软"] },
  nvidia: { name: "NVIDIA", displayTag: null, aliases: ["NVIDIA", "英伟达"], orgNames: ["NVIDIA", "英伟达"] },
  "hugging-face": { name: "Hugging Face", displayTag: "Hugging Face", aliases: ["Hugging Face"], orgNames: ["Hugging Face", "HuggingFace"] },
  cursor: { name: "Cursor", displayTag: null, aliases: ["Cursor", "Anysphere"], orgNames: ["Cursor"] },
  openrouter: { name: "OpenRouter", displayTag: null, aliases: ["OpenRouter"], orgNames: ["OpenRouter"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  // 韩国公司：原文多是韩文写法，标题摘要多是中文或英文写法，几种写法都要列上，否则会被当成原文没提到。
  { id: "naver", name: "Naver / HyperCLOVA X", patterns: [/naver|네이버|hyper\s?clova|하이퍼\s?클로바|clova|클로바/i] },
  { id: "kakao", name: "Kakao / Kanana", patterns: [/kakao|카카오|kanana|카나나/i] },
  { id: "lg", name: "LG AI 研究院 / EXAONE", patterns: [/\bLG\b|LG(?:전자|CNS|유플러스|U\+)|exaone|엑사원/i] },
  { id: "samsung", name: "Samsung / Gauss", patterns: [/samsung|삼성|三星|갤럭시\s?AI|galaxy\s?ai/i] },
  { id: "skt", name: "SK Telecom / A.X", patterns: [/\bSKT\b|SK\s?telecom|SK텔레콤|SK电讯|에이닷/i] },
  { id: "kt", name: "KT / 믿:음", patterns: [/\bKT\b|믿:음|mi:dm/i] },
  { id: "upstage", name: "Upstage / Solar", patterns: [/upstage|업스테이지/i] },
  { id: "wrtn", name: "Wrtn 뤼튼", patterns: [/wrtn|뤼튼/i] },
  { id: "ncsoft", name: "NC AI / VARCO", patterns: [/\bNC\s?AI\b|ncsoft|엔씨소프트|varco|바르코/i] },
  { id: "openai", name: "OpenAI", patterns: [/openai|오픈\s?AI|chatgpt|챗\s?GPT|챗지피티|\bgpt-?[o\d]|\bsora\b|소라|\bcodex\b|코덱스/i] },
  { id: "anthropic", name: "Anthropic", patterns: [/anthropic|앤트로픽|앤스로픽|\bclaude\b|클로드/i, /\b(?:opus|sonnet|haiku)\s*\d+(?:[.\-]\d+)*\b/i, /\bfable\s*\d+(?:[.\-]\d+)*\b|\bmythos\b/i] },
  { id: "google", name: "Google / Gemini", patterns: [/google|구글|谷歌|deepmind|딥마인드|\bgemini\b|제미나이|notebooklm|\bveo\s?\d|\bAlphaFold\b|\bAMIE\b/i] },
  { id: "deepseek", name: "DeepSeek", patterns: [/deepseek|딥시크|深度求索/i] },
  { id: "xai", name: "xAI / Grok", patterns: [/\bxai\b|\bgrok\b|그록/i] },
  { id: "meta", name: "Meta / Llama", patterns: [/\bMeta\b/, /\bmeta\s?ai\b|\bllama\b|메타\s?AI|라마\s?\d/i] },
  { id: "microsoft", name: "Microsoft / Copilot", patterns: [/microsoft|마이크로소프트|copilot|코파일럿|微软/i] },
  { id: "nvidia", name: "NVIDIA", patterns: [/nvidia|엔비디아|英伟达|\bnemotron\b|\bnemo\b|\bblackwell\b|\brubin(?:\s+ultra)?\b|\bcuda\b/i] },
  { id: "qwen", name: "千问 Qwen", patterns: [/\bqwen|큐웬|通义|千问/i] },
  { id: "hugging-face", name: "Hugging Face", patterns: [/hugging\s?face|허깅\s?페이스/i] },
  { id: "cursor", name: "Cursor", patterns: [/\bCursor\b/] },
  { id: "kimi", name: "Kimi / 月之暗面", patterns: [/\bkimi\b|月之暗面|\bmoonshot\s?ai\b/i] },
  { id: "openrouter", name: "OpenRouter", patterns: [/openrouter/i] },
  { id: "minimax", name: "MiniMax", patterns: [/minimax/i] },
  { id: "zhipu", name: "智谱 GLM", patterns: [/智谱|\bglm-?[4-9]/i] },
  { id: "hunyuan", name: "腾讯混元", patterns: [/混元|hunyuan/i] },
  { id: "doubao", name: "字节豆包", patterns: [/豆包|doubao|字节跳动|bytedance/i] },
  { id: "mistral", name: "Mistral", patterns: [/mistral/i] },
  { id: "perplexity", name: "Perplexity", patterns: [/\bPerplexity\b|퍼플렉시티/] },
  { id: "runway", name: "Runway", patterns: [/\brunway\b/i] },
  { id: "suno", name: "Suno", patterns: [/\bsuno\b/i] },
  { id: "midjourney", name: "Midjourney", patterns: [/midjourney/i] },
  { id: "stability-ai", name: "Stability AI", patterns: [/stability\s?ai/i] },
  { id: "elevenlabs", name: "ElevenLabs", patterns: [/eleven\s?labs/i] },
  { id: "vllm", name: "vLLM", patterns: [/\bvllm\b/i] },
  { id: "ollama", name: "Ollama", patterns: [/\bollama\b/i] },
  { id: "windsurf", name: "Windsurf", patterns: [/windsurf/i] },
  { id: "devin", name: "Devin", patterns: [/\bdevin\b/i] },
  { id: "manus", name: "Manus", patterns: [/\bmanus\b/i] },
  { id: "apple", name: "Apple AI", patterns: [/\bapple\s?(intelligence|silicon|ai)\b|애플\s?인텔리전스|苹果(智能|\s?AI)/i] },
  { id: "amazon", name: "Amazon / AWS", patterns: [/amazon|아마존|\baws\b|亚马逊/i] },
  { id: "baidu", name: "百度文心", patterns: [/百度|baidu|文心|\bernie\s?bot\b/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台如 GitHub、arXiv 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "naver", domains: ["navercorp.com", "d2.naver.com", "clova.ai", "ncloud.com"] },
  { entityId: "kakao", domains: ["kakaocorp.com", "tech.kakao.com"] },
  { entityId: "lg", domains: ["lgresearch.ai"] },
  { entityId: "samsung", domains: ["news.samsung.com", "research.samsung.com"] },
  { entityId: "skt", domains: ["news.sktelecom.com", "sktelecom.com"] },
  { entityId: "upstage", domains: ["upstage.ai"] },
  { entityId: "openai", domains: ["openai.com"] },
  { entityId: "anthropic", domains: ["anthropic.com", "claude.com"] },
  { entityId: "google", domains: ["deepmind.google", "ai.google", "blog.google"] },
  { entityId: "deepseek", domains: ["deepseek.com"] },
  { entityId: "xai", domains: ["x.ai"] },
  { entityId: "meta", domains: ["ai.meta.com"] },
  { entityId: "microsoft", domains: ["microsoft.com"] },
  { entityId: "nvidia", domains: ["nvidia.com"] },
  { entityId: "qwen", domains: ["qwen.ai"] },
  { entityId: "cursor", domains: ["cursor.com"] },
  { entityId: "openrouter", domains: ["openrouter.ai"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "meta", pattern: /@AIatMeta\b/i },
  { entityId: "zhipu", pattern: /\bZhipu(?:\s+AI\b|['’]s\b)/i },
];
