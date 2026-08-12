/**
 * posts-data.js — 所有文章的目录数据
 *
 * 每次新建一篇文章，只需要：
 *  1. 在 posts/ 目录下创建对应的 HTML 文件
 *  2. 在下面 posts 数组里添加一条记录
 *
 * 字段说明：
 *  id            — 唯一数字 ID；只要求全局唯一，不代表学习顺序
 *  file          — 对应的文章文件名（放在 posts/ 目录下）
 *  title         — 文章标题
 *  tag           — 分类标签
 *  date          — 发布日期 YYYY-MM-DD
 *  excerpt       — 摘要，显示在列表页（建议 50–80 字）
 *  readTime      — 阅读时长估算（如 "约 12 分钟"）
 *  cover         — 封面图路径（相对于 index.html），留空则显示 emoji 占位
 *  emoji         — 封面无图时的占位符号
 *  learningTrack — 所属学习路线；非学习路线文章可省略
 *  learningOrder — 在所属 learningTrack 内的顺序；非学习路线文章可省略
 *  learningLabel — 学习路线中显示的精简名称
 *
 * 学习路线：
 *  proof-systems — 证明系统与零知识证明
 *  mpc           — 秘密共享与安全多方计算
 */

window.learningTracks = {
  "proof-systems": {
    label: "证明系统与零知识证明",
    order: 1
  },
  "mpc": {
    label: "秘密共享与安全多方计算",
    order: 2
  }
};

window.posts = [

  // ============================================================
  // 学习路线一：证明系统与零知识证明
  // ============================================================

  {
    id: 24,
    file: "posts/ideal-real-simulation-security.html",
    title: "理想—现实模拟安全：怎样严格定义协议没有额外泄漏",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "从理想功能、真实/理想实验与模拟器出发，以双服务器求和逐步说明隐私证明，并区分正确性、输入有效性、公平性、鲁棒性与组合安全。",
    readTime: "约 30 分钟",
    cover: "",
    emoji: "R/I",
    learningTrack: "proof-systems",
    learningOrder: 1,
    learningLabel: "理想功能与模拟安全"
  },

  {
    id: 25,
    file: "posts/arithmetic-circuits-r1cs-qap.html",
    title: "从程序到约束：Arithmetic Circuit、R1CS 与 QAP",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "从公共输入和私有见证出发，把程序编译为算术电路、R1CS 和 QAP，并分析有限域语义、模回绕、欠约束和公共输入绑定。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "R1CS",
    learningTrack: "proof-systems",
    learningOrder: 2,
    learningLabel: "电路、R1CS 与 QAP"
  },

  {
    id: 3,
    file: "posts/p-np-sat-interactive-proof.html",
    title: "P、NP、SAT 与 Interactive Proof",
    tag: "证明系统",
    date: "2026-08-02",
    excerpt: "从求解与验证的区别出发，梳理 P、NP、NP-complete、SAT 与多项式归约，并用 Completeness、Soundness 和随机挑战建立 Interactive Proof 的基础。",
    readTime: "约 9 分钟",
    cover: "",
    emoji: "NP",
    learningTrack: "proof-systems",
    learningOrder: 3,
    learningLabel: "复杂性与交互证明"
  },

  {
    id: 5,
    file: "posts/commitment-schemes.html",
    title: "Commitment Scheme：Hiding 与 Binding",
    tag: "证明系统",
    date: "2026-08-02",
    excerpt: "从 Commit/Open 两阶段出发，形式化 Hiding 与 Binding，并通过 PRG 构造解释 OWF、公共参数、接收者随机挑战以及 Adaptive/Non-Adaptive 安全。",
    readTime: "约 12 分钟",
    cover: "",
    emoji: "C",
    learningTrack: "proof-systems",
    learningOrder: 4,
    learningLabel: "承诺方案"
  },

  {
    id: 4,
    file: "posts/interactive-zk.html",
    title: "Interactive Zero-Knowledge Proofs",
    tag: "证明系统",
    date: "2026-08-02",
    excerpt: "围绕 Verifier View 与 Simulator 的不可区分性，解释 Rewinding，并用二次剩余数值交互和三染色协议展示 Zero-Knowledge 如何实现。",
    readTime: "约 13 分钟",
    cover: "",
    emoji: "ZK",
    learningTrack: "proof-systems",
    learningOrder: 5,
    learningLabel: "交互式零知识"
  },

  {
    id: 22,
    file: "posts/nizk-fiat-shamir.html",
    title: "NIZK 与 Fiat–Shamir：从随机挑战到非交互证明",
    tag: "证明系统",
    date: "2026-08-04",
    excerpt: "区分 NIZK、Fiat–Shamir 与 ROM，从三消息公开币协议出发，结合 Schnorr 数值例子说明哈希挑战、验证过程及安全边界。",
    readTime: "约 8 分钟",
    cover: "",
    emoji: "FS",
    learningTrack: "proof-systems",
    learningOrder: 7,
    learningLabel: "NIZK 与 Fiat–Shamir"
  },

  {
    id: 6,
    file: "posts/knowledge-soundness.html",
    title: "Knowledge Soundness 与现代证明系统",
    tag: "证明系统",
    date: "2026-08-02",
    excerpt: "从普通 Soundness 的边界出发，引入 Extractor 与 Knowledge Soundness，并对照 Simulator，梳理 NIZK、SNARK、STARK、Bulletproofs 与 Sumcheck 的关系和取舍。",
    readTime: "约 15 分钟",
    cover: "",
    emoji: "PoK",
    learningTrack: "proof-systems",
    learningOrder: 8,
    learningLabel: "知识可靠性"
  },

  {
    id: 2,
    file: "posts/sumcheck-protocol-notes.html",
    title: "Sumcheck Protocol：逐轮压缩求和",
    tag: "证明系统",
    date: "2026-07-31",
    excerpt: "使用 T、P_i、M_i、r_i 的直观符号体系，以有限域 F_17 上的三变量多项式完整演示 Prover 与 Verifier 如何逐轮压缩求和声明。",
    readTime: "约 12 分钟",
    cover: "",
    emoji: "∑",
    learningTrack: "proof-systems",
    learningOrder: 9,
    learningLabel: "Sumcheck 协议"
  },

  {
    id: 19,
    file: "posts/multilinear-extension.html",
    title: "Multilinear Extension：从 Boolean Table 到低度多项式",
    tag: "证明系统",
    date: "2026-08-03",
    excerpt: "从一维 Boolean Lagrange basis 出发，解释固定 basis、唯一多线性扩展、同一 basis 如何表示不同 table，以及随机有限域点求值在 Sumcheck 和 GKR 中的意义。",
    readTime: "约 16 分钟",
    cover: "",
    emoji: "MLE",
    learningTrack: "proof-systems",
    learningOrder: 10,
    learningLabel: "Multilinear Extension"
  },

  {
    id: 18,
    file: "posts/gkr-protocol-notes.html",
    title: "GKR Protocol：从电路执行到逐层多项式验证",
    tag: "证明系统",
    date: "2026-08-02",
    excerpt: "从分层电路与 gate-value table 出发，依次理解 Multilinear Extension、wiring predicate 与逐层 Sumcheck 归约，并通过数值例子和示意图串联 GKR 的完整验证主线。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "GKR",
    learningTrack: "proof-systems",
    learningOrder: 11,
    learningLabel: "GKR 协议"
  },

  {
    id: 20,
    file: "posts/kzg-polynomial-commitment.html",
    title: "KZG Polynomial Commitment：从指数编码到点值证明",
    tag: "证明系统",
    date: "2026-08-03",
    excerpt: "从 Gen、Com、Open 与 Ver 四个算法出发，理解 KZG 如何利用隐藏点的 SRS 编码 polynomial commitment，并通过 quotient polynomial 与 bilinear pairing 验证指定点上的 evaluation。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "KZG",
    learningTrack: "proof-systems",
    learningOrder: 13,
    learningLabel: "KZG Polynomial Commitment"
  },

  {
    id: 23,
    file: "posts/from-gkr-to-snarg.html",
    title: "From GKR to SNARG：从交互式电路验证到简洁非交互论证",
    tag: "证明系统",
    date: "2026-08-04",
    excerpt: "从 GKR 的深度限制和未知输入问题出发，梳理 circuit flattening、兼容的多线性 Polynomial Commitment 与 Fiat–Shamir 如何组成 SNARG 构造蓝图，并明确接口和组合安全条件。",
    readTime: "约 18 分钟",
    cover: "",
    emoji: "SNARG",
    learningTrack: "proof-systems",
    learningOrder: 14,
    learningLabel: "From GKR to SNARG"
  },

  {
    id: 31,
    file: "posts/sigma-protocols.html",
    title: "Σ-Protocols：三消息证明、知识提取与模拟",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "统一形式化三消息公开币证明，用 Schnorr 解释完备性、特殊可靠性、特殊诚实验证者零知识、知识提取、组合与 Fiat–Shamir 边界。",
    readTime: "约 18 分钟",
    cover: "",
    emoji: "Σ",
    learningTrack: "proof-systems",
    learningOrder: 6,
    learningLabel: "Σ-Protocols"
  },

  {
    id: 32,
    file: "posts/polynomial-iop-pcs-map.html",
    title: "Polynomial IOP 与 PCS：把 Oracle 查询编译为可验证承诺",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "解释真实网络为何不能直接使用理想多项式 Oracle，给出 PCS 的承诺与开点接口，比较 KZG、IPA 和 FRI，并说明从 Polynomial IOP 编译到真实 argument 的条件。",
    readTime: "约 21 分钟",
    cover: "",
    emoji: "PIOP",
    learningTrack: "proof-systems",
    learningOrder: 12,
    learningLabel: "Polynomial IOP 与 PCS"
  },

  {
    id: 33,
    file: "posts/groth16.html",
    title: "Groth16：从 R1CS/QAP 到三群元素 zkSNARK",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "贯通 R1CS、QAP、circuit-specific CRS、三群元素证明和 pairing 验证，并严格说明知识可靠性、零知识、公共输入绑定与可信设置边界。",
    readTime: "约 22 分钟",
    cover: "",
    emoji: "G16",
    learningTrack: "proof-systems",
    learningOrder: 15,
    learningLabel: "Groth16"
  },

  {
    id: 35,
    file: "posts/plonk.html",
    title: "PLONK：置换论证、商多项式与通用 SRS",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "从 Lagrange 基门算术化和 copy constraints 出发，推导 permutation grand product 与 quotient polynomial，并澄清通用 SRS、透明性和零知识边界。",
    readTime: "约 22 分钟",
    cover: "",
    emoji: "PLONK",
    learningTrack: "proof-systems",
    learningOrder: 16,
    learningLabel: "PLONK"
  },

  {
    id: 36,
    file: "posts/fri-stark.html",
    title: "FRI 与 STARK：从执行轨迹到透明低度证明",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "把执行轨迹写成 AIR，经低度扩展和 Merkle 承诺固定 oracle，再用 FRI folding 与随机查询验证低度性，并严格界定透明、零知识和后量子安全。",
    readTime: "约 22 分钟",
    cover: "",
    emoji: "FRI",
    learningTrack: "proof-systems",
    learningOrder: 18,
    learningLabel: "FRI 与 STARK"
  },

  {
    id: 37,
    file: "posts/bulletproofs-ipa.html",
    title: "Bulletproofs 与 IPA：无可信设置的范围证明",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "从 Pedersen 承诺和位向量范围约束出发，解释 Inner-Product Argument 的递归折叠、证明聚合、Fiat–Shamir 以及证明短而验证仍线性的取舍。",
    readTime: "约 19 分钟",
    cover: "",
    emoji: "IPA",
    learningTrack: "proof-systems",
    learningOrder: 19,
    learningLabel: "Bulletproofs 与 IPA"
  },

  {
    id: 38,
    file: "posts/nova-folding-ivc.html",
    title: "Nova 与 Folding：从 Relaxed R1CS 到 IVC",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "解释 relaxed R1CS 如何吸收折叠交叉项、Nova 如何递归累积增量计算，并区分 folding scheme、IVC、最终压缩、知识可靠性和零知识。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "NOVA",
    learningTrack: "proof-systems",
    learningOrder: 20,
    learningLabel: "Nova 与 Folding"
  },

  {
    id: 39,
    file: "posts/zk-implementation-security.html",
    title: "零知识证明实现安全：从欠约束到 Transcript 绑定",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "以红队视角审查欠约束、witness generator 偏差、公共输入、Fiat–Shamir transcript、规范编码、子群检查、随机性、设置与侧信道。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "AUDIT",
    learningTrack: "proof-systems",
    learningOrder: 22,
    learningLabel: "ZK 实现安全"
  },

  {
    id: 43,
    file: "posts/lookup-range-checks.html",
    title: "Lookup Arguments 与 Range Checks：现代 ZK 电路的约束加速器",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "从位分解范围证明出发，解释多列元组随机压缩、置换或 log-derivative 多重集合检查，以及 Lookup 在范围、字节运算和内存表中的安全边界。",
    readTime: "约 19 分钟",
    cover: "",
    emoji: "LUT",
    learningTrack: "proof-systems",
    learningOrder: 17,
    learningLabel: "Lookup 与 Range Checks"
  },

  {
    id: 44,
    file: "posts/zkvm.html",
    title: "zkVM：从指令执行轨迹到可验证程序",
    tag: "证明系统",
    date: "2026-08-12",
    excerpt: "从程序承诺、ISA 和执行轨迹出发，分析 CPU transition、内存一致性、跨表 lookup、分段递归，以及应用、编译器、VM 和证明系统的分层安全责任。",
    readTime: "约 21 分钟",
    cover: "",
    emoji: "zkVM",
    learningTrack: "proof-systems",
    learningOrder: 21,
    learningLabel: "zkVM"
  },

  // ============================================================
  // 学习路线二：秘密共享与安全多方计算
  // ============================================================

  {
    id: 13,
    file: "posts/shamir-secret-sharing.html",
    title: "Shamir Secret Sharing：从随机多项式到门限重构",
    tag: "安全多方计算",
    date: "2026-08-02",
    excerpt: "利用有限域上的随机多项式把秘密拆成 n 份，使任意 t 份能够重构而少于 t 份不泄露秘密，并完整演示拉格朗日插值。",
    readTime: "约 11 分钟",
    cover: "",
    emoji: "SSS",
    learningTrack: "mpc",
    learningOrder: 1,
    learningLabel: "Shamir Secret Sharing"
  },

  {
    id: 21,
    file: "posts/bgw-protocol.html",
    title: "BGW 协议：基于 Shamir 秘密共享的安全多方计算",
    tag: "安全多方计算",
    date: "2026-08-04",
    excerpt: "从参与方自行共享输入开始，以同一组数值贯穿加法、乘法和输出重构，重点解释局部乘积重新共享、拉格朗日权重合并及次数约简。",
    readTime: "约 22 分钟",
    cover: "",
    emoji: "BGW",
    learningTrack: "mpc",
    learningOrder: 2,
    learningLabel: "BGW 协议"
  },

  {
    id: 26,
    file: "posts/additive-replicated-secret-sharing.html",
    title: "加法与复制秘密共享：现代 MPC 的数据表示",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "比较加法、复制与 Shamir 共享，解释本地线性运算、门限结构、诚实多数假设，以及有限域、二幂环和二进制共享的工程差异。",
    readTime: "约 15 分钟",
    cover: "",
    emoji: "[x]",
    learningTrack: "mpc",
    learningOrder: 3,
    learningLabel: "加法与复制秘密共享"
  },

  {
    id: 27,
    file: "posts/beaver-triples.html",
    title: "Beaver Triples：把秘密乘法移到预处理阶段",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "完整推导离线—在线乘法，解释为什么打开随机掩码差不泄漏输入，并分析三元组一次性使用、生成、验证与恶意 opening 风险。",
    readTime: "约 18 分钟",
    cover: "",
    emoji: "abc",
    learningTrack: "mpc",
    learningOrder: 4,
    learningLabel: "Beaver Triples"
  },

  {
    id: 28,
    file: "posts/oblivious-transfer-gmw.html",
    title: "Oblivious Transfer 与 GMW：从选择隐私到布尔电路 MPC",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "从 1-out-of-2 OT 的双方隐私出发，推导 GMW 中 XOR 共享与 AND 交叉项计算，并分析 AND-depth、OT extension 和恶意安全边界。",
    readTime: "约 19 分钟",
    cover: "",
    emoji: "OT",
    learningTrack: "mpc",
    learningOrder: 5,
    learningLabel: "OT 与 GMW"
  },

  {
    id: 29,
    file: "posts/yao-garbled-circuits.html",
    title: "Yao Garbled Circuits：用随机标签执行两方私有计算",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "以 wire labels 和 garbled table 为主线，说明 input OT、point-and-permute、Free-XOR、half-gates，以及从半诚实到恶意 Yao 的关键差距。",
    readTime: "约 18 分钟",
    cover: "",
    emoji: "GC",
    learningTrack: "mpc",
    learningOrder: 6,
    learningLabel: "Yao Garbled Circuits"
  },

  {
    id: 30,
    file: "posts/vss-authenticated-sharing-spdz.html",
    title: "从 VSS 到 SPDZ：恶意安全 MPC 如何验证份额与计算",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "区分 Feldman/Pedersen VSS，形式化 SPDZ 认证份额、离线在线执行与批量 MAC check，并明确主动安全、检测中止与公平性的边界。",
    readTime: "约 22 分钟",
    cover: "",
    emoji: "SPDZ",
    learningTrack: "mpc",
    learningOrder: 7,
    learningLabel: "VSS 与 SPDZ"
  },

  {
    id: 34,
    file: "posts/mpc-in-the-head.html",
    title: "MPC-in-the-Head：把多方计算视图编译成零知识证明",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "在证明者本地模拟虚拟 MPC，承诺各方视图并随机打开子集，解释零知识、可靠性重复、Fiat–Shamir、Picnic 路线及实现风险。",
    readTime: "约 18 分钟",
    cover: "",
    emoji: "MitH",
    learningTrack: "mpc",
    learningOrder: 11,
    learningLabel: "MPC-in-the-Head"
  },

  {
    id: 40,
    file: "posts/mpc-fixed-point-comparison-truncation.html",
    title: "MPC 数值计算：定点数、比较、截断与域转换",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "从定点编码和有符号解释出发，分析乘法缩放、安全截断、比较、位分解、算术/布尔共享转换、模回绕与误差预算。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "FXP",
    learningTrack: "mpc",
    learningOrder: 8,
    learningLabel: "MPC 数值计算"
  },

  {
    id: 41,
    file: "posts/secure-aggregation.html",
    title: "Secure Aggregation：掉线与串谋下的联邦求和",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "从成对掩码抵消、私有掩码和门限恢复出发，解释掉线处理、成员集合一致性与串谋阈值，并区分输入隐私、投毒、Sybil 和输出推断。",
    readTime: "约 19 分钟",
    cover: "",
    emoji: "ΣFL",
    learningTrack: "mpc",
    learningOrder: 9,
    learningLabel: "安全聚合"
  },

  {
    id: 42,
    file: "posts/private-set-intersection.html",
    title: "Private Set Intersection：只揭示集合交集",
    tag: "安全多方计算",
    date: "2026-08-12",
    excerpt: "形式化 PSI 的输出与泄漏，比较 OPRF、OT extension、哈希分桶和通用 MPC 路线，并分析规范编码、集合大小、恶意输入和跨轮枚举攻击。",
    readTime: "约 18 分钟",
    cover: "",
    emoji: "PSI",
    learningTrack: "mpc",
    learningOrder: 10,
    learningLabel: "Private Set Intersection"
  },

  // ============================================================
  // 其他密码学基础篇章
  // ============================================================

  {
    id: 7,
    file: "posts/des.html",
    title: "Data Encryption Standard（DES，数据加密标准）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "从 64 位分组、56 位有效密钥和 16 轮 Feistel 结构出发，逐步解释 DES 的轮函数、密钥调度，并演示标准测试向量。",
    readTime: "约 10 分钟",
    cover: "",
    emoji: "DES"
  },

  {
    id: 8,
    file: "posts/aes.html",
    title: "Advanced Encryption Standard（AES，高级加密标准）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "用 4×4 字节状态矩阵解释 AES 的 SubBytes、ShiftRows、MixColumns 与 AddRoundKey，并完整核对 AES-128 标准示例。",
    readTime: "约 11 分钟",
    cover: "",
    emoji: "AES"
  },

  {
    id: 9,
    file: "posts/diffie-hellman.html",
    title: "Diffie–Hellman Key Exchange（DH，Diffie–Hellman 密钥交换）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "从有限循环群和离散对数问题出发，展示双方如何交换公开值并独立得到同一共享秘密，同时说明认证与 KDF 的必要性。",
    readTime: "约 9 分钟",
    cover: "",
    emoji: "DH"
  },

  {
    id: 10,
    file: "posts/elgamal.html",
    title: "ElGamal Public-Key Encryption（ElGamal，ElGamal 公钥加密）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "把 Diffie–Hellman 共享秘密变成随机化公钥加密，逐步演示密钥生成、双分量密文、解密与一次性随机数的作用。",
    readTime: "约 9 分钟",
    cover: "",
    emoji: "EG"
  },

  {
    id: 11,
    file: "posts/rsa.html",
    title: "Rivest–Shamir–Adleman（RSA，RSA 公钥密码算法）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "从两个大素数构造公私钥，解释欧拉函数、模逆、加解密正确性，并用经典小参数例子说明为何实际必须使用 OAEP 或 PSS。",
    readTime: "约 10 分钟",
    cover: "",
    emoji: "RSA"
  },

  {
    id: 12,
    file: "posts/ecc.html",
    title: "Elliptic Curve Cryptography（ECC，椭圆曲线密码学）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "从有限域上的椭圆曲线、点加法与标量乘法出发，演示小曲线密钥生成，并区分 ECC、ECDH、ECDSA 与 ECIES。",
    readTime: "约 12 分钟",
    cover: "",
    emoji: "ECC"
  },

  {
    id: 14,
    file: "posts/sha1.html",
    title: "Secure Hash Algorithm 1（SHA-1，安全散列算法 1）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "从消息填充、512 位分组和 80 轮压缩出发，完整说明 SHA-1 如何生成 160 位摘要，并用 abc 测试向量说明其结果与现代安全边界。",
    readTime: "约 11 分钟",
    cover: "",
    emoji: "SHA"
  },

  {
    id: 15,
    file: "posts/hmac.html",
    title: "Hash-based Message Authentication Code（HMAC，基于哈希的消息认证码）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "解释密钥规范化、ipad/opad 内外两层散列与常数时间验证，并用 HMAC-SHA-256 标准测试向量展示完整数据流。",
    readTime: "约 10 分钟",
    cover: "",
    emoji: "MAC"
  },

  {
    id: 16,
    file: "posts/sm2.html",
    title: "SM2 Elliptic Curve Public-Key Cryptography（SM2，SM2 椭圆曲线公钥密码算法）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "聚焦 SM2 公钥加密，逐步解释临时曲线点、共享点、KDF 掩码以及 C1、C2、C3 的生成、解析和完整性验证。",
    readTime: "约 13 分钟",
    cover: "",
    emoji: "SM2"
  },

  {
    id: 17,
    file: "posts/sm4.html",
    title: "SM4 Block Cipher（SM4，SM4 分组密码算法）",
    tag: "密码学基础",
    date: "2026-08-02",
    excerpt: "从 128 位分组和密钥出发，拆解 SM4 的 32 轮结构、S-box、线性变换与密钥扩展，并核对国家标准测试向量。",
    readTime: "约 12 分钟",
    cover: "",
    emoji: "SM4"
  }

];
