
【AI 领域翻译规则 — 本平台 100% 是 AI/ML/LLM 行业内容，严格遵守；原文大多是韩文，读者读中文】

1. 歧义默认值：以下词在中文有非 AI 歧义，**一律按 AI 含义翻译**：
   - LLM = 大语言模型（绝不译"法学硕士"/"Master of Laws"）
   - Token / tokens = 模型 token（保留英文；绝不译"代币"/"令牌"）
   - Transformer = Transformer 架构（保留英文；不译"变压器"）
   - Diffusion = 扩散模型（AI 生成，不是物理扩散）
   - Agent / Agentic = AI 智能体 / 智能体的（不译"代理人"/"中介"）
   - Alignment = 对齐（AI 安全语境）
   - Inference = 推理（模型生成）
   - Reasoning = 推理（注意：与 inference 都译"推理"，必要时用"链式推理"区分 CoT；reasoning model 指 o1/o3/R1 这类思考型模型）
   - Embedding = 嵌入向量（也可保留英文）
   - Distillation = 知识蒸馏
   - Hallucination = 模型幻觉
   - Fine-tune / Fine-tuning = 微调
   - Pretrain / Pretraining = 预训练
   - Context window = 上下文窗口
   - Prompt = 提示词
   - Skill / Skills = 技能（Claude 等 Agent 框架的能力包，不译"特长"）

2. 以下专有名词**一律保留英文原文**，不翻译不加中文括注：
   - AI 公司：OpenAI / Anthropic / Google DeepMind / xAI / Meta AI / Mistral / DeepSeek / Cohere / HuggingFace（HF）/ Runway / ElevenLabs / Suno / Pika / Midjourney / Perplexity
   - 模型族（举例 + 通用规则）：GPT / Claude / Gemini / Llama / Qwen / Grok / o 系列 / DeepSeek / Mistral / Mixtral / Phi / Sora / Veo / Imagen
     **规则**：任何大模型族名、产品代号一律保留英文
   - 模型版本号（举例 + 通用规则）：GPT-5 / Claude 4.7 / Claude Sonnet 4.6 / Llama 4 / Gemini 3 / o3 / o4 / DeepSeek-V4 / Qwen3.7
     **规则**：版本号一字不改（包括字母数字后缀如 4o / 4.7 / 405B / V4 / R1），绝不"翻译性扩写"（不要把 "405B" 译成 "4050 亿"，不要把 "V4" 译成 "第 4 代"）
   - 技术缩写（举例 + 通用规则）：LLM / RAG / RLHF / DPO / LoRA / QLoRA / PEFT / MoE / CoT / ReAct / KV cache / SOTA / AGI / MCP / ADK / NPU / GPU / TPU
     **规则**：任何 2-5 字母的全大写缩写，默认按 AI/ML 含义保留英文
   - 评测基准（举例 + 通用规则）：MMLU / GPQA / HumanEval / SWE-bench / SWE-bench Verified / AIME / HLE / ARC-AGI / ARC-AGI 2 / MT-Bench / Chatbot Arena / Aider Polyglot / LiveCodeBench
     **规则**：以 -bench / -eval 结尾或全大写的评测名一律保留英文
   - AI 工具/产品：Cursor / Copilot / Codex / Aider / Devin / Cline / Claude Code / Windsurf / Zed / v0 / Bolt / Lovable / Replit Agent
   - Agent 框架：LangChain / LangGraph / LlamaIndex / CrewAI / AutoGen / Pydantic AI / Vercel AI SDK / DSPy
   - 推理/部署：Ollama / vLLM / SGLang / TensorRT / Triton / CUDA / ROCm
   - 通用技术：API / SDK / CLI / IDE / SaaS / CDN / SSO / OAuth / JWT / WebSocket / SSE / gRPC

3. 韩国公司、产品和机构（原文多是韩文写法）：
   - 公司与模型用通行的英文名，不音译成中文：Naver（네이버）/ HyperCLOVA X（하이퍼클로바X）/ CLOVA X / Naver Cloud / Kakao（카카오）/ Kanana（카나나）/ LG AI 研究院（LG AI연구원）/ EXAONE（엑사원）/ Upstage（업스테이지）/ Solar（솔라）/ SK Telecom 或 SKT（SK텔레콤）/ A.X / 에이닷 写作 A.（에이닷）/ KT / 믿:음（Mi:dm）/ NC AI / VARCO / Wrtn（뤼튼）/ Liner / AskUp / Twelve Labs / Rebellions（리벨리온）/ FuriosaAI（퓨리오사AI）
   - Samsung 写“三星”，Gauss（가우스）保留英文；Galaxy AI 保留英文
   - 外国公司和产品的韩文写法（오픈AI、챗GPT、앤트로픽、클로드、구글、제미나이、엔비디아、딥시크、마이크로소프트、코파일럿）一律写回英文原名 OpenAI / ChatGPT / Anthropic / Claude / Google / Gemini / NVIDIA / DeepSeek / Microsoft / Copilot
   - 政府机构和政策译成中文并点明是韩国的：과기정통부 / 과학기술정보통신부 = 韩国科学技术信息通信部；개인정보보호위원회 = 韩国个人信息保护委员会；AI 기본법 = 韩国《人工智能基本法》；소버린 AI / 주권 AI = 主权 AI；독자 AI 파운데이션 모델（독파모）= 独立 AI 基础模型项目
   - 韩国人名保留韩文原文（如 최수연），不要自行换成汉字或拼音：韩文名对应哪几个汉字无法从原文确定
   - 金额保留原文单位：억 원 / 조 원 换算成“亿韩元 / 万亿韩元”时数字必须对应（1조 원 = 1 万亿韩元，100억 원 = 100 亿韩元），不换算成人民币或美元

4. 中国厂商**优先用官方中文品牌名**（首次出现可双标"千问（Qwen3）"，后续选一种保持一致）：
   - 千问（Qwen）/ 文心一言 / 智谱（GLM）/ 月之暗面（Kimi）/ 深度求索（DeepSeek）/ 阶跃星辰（Step）/ 零一万物（Yi）/ 百川 / 豆包（字节）/ 混元（腾讯）/ 可灵（Kling，快手）/ 即梦（Jimeng，字节）/ MiniMax（不译）/ 美团 LongCat / 昆仑万维 Skywork / 面壁 MiniCPM / 华为昇腾 / 寒武纪

5. 代码 / 命令 / URL / 数字单位 **一字不改**保留：
   - 反引号代码 `code` 不翻译
   - 命令如 /code-review、pip install、npm run 不译（不要译"代码审查"）
   - URL 原样
   - 数字+单位：8k context / 175B params / 3.5x speedup / $3 per M tokens / 99.9%
   - 金额、参数量、比例、区间必须保留原文的阿拉伯数字和单位；不要把 $10B-$100B 改写成“数百亿至数千亿美元”等中文数量词
