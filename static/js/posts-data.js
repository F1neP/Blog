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
    id: 3,
    file: "posts/p-np-sat-interactive-proof.html",
    title: "P、NP、SAT 与 Interactive Proof",
    tag: "证明系统与零知识证明",
    date: "2026-08-02",
    excerpt: "从求解与验证的区别出发，梳理 P、NP、NP-complete、SAT 与多项式归约，并用 Completeness、Soundness 和随机挑战建立 Interactive Proof 的基础。",
    readTime: "约 9 分钟",
    cover: "",
    emoji: "NP",
    learningTrack: "proof-systems",
    learningOrder: 1,
    learningLabel: "复杂性与交互证明"
  },

  {
    id: 5,
    file: "posts/commitment-schemes.html",
    title: "Commitment Scheme：Hiding 与 Binding",
    tag: "证明系统与零知识证明",
    date: "2026-08-02",
    excerpt: "从 Commit/Open 两阶段出发，形式化 Hiding 与 Binding，并通过 PRG 构造解释 OWF、公共参数、接收者随机挑战以及 Adaptive/Non-Adaptive 安全。",
    readTime: "约 12 分钟",
    cover: "",
    emoji: "C",
    learningTrack: "proof-systems",
    learningOrder: 2,
    learningLabel: "承诺方案"
  },

  {
    id: 4,
    file: "posts/interactive-zk.html",
    title: "Interactive Zero-Knowledge Proofs",
    tag: "证明系统与零知识证明",
    date: "2026-08-02",
    excerpt: "围绕 Verifier View 与 Simulator 的不可区分性，解释 Rewinding，并用二次剩余数值交互和三染色协议展示 Zero-Knowledge 如何实现。",
    readTime: "约 13 分钟",
    cover: "",
    emoji: "ZK",
    learningTrack: "proof-systems",
    learningOrder: 3,
    learningLabel: "交互式零知识"
  },

  {
    id: 22,
    file: "posts/nizk-fiat-shamir.html",
    title: "NIZK 与 Fiat–Shamir：从随机挑战到非交互证明",
    tag: "证明系统与零知识证明",
    date: "2026-08-04",
    excerpt: "从 NIZK 的 CRS 接口出发，理解 public-coin 证明如何在 Random Oracle Model 中用 Fiat–Shamir 将 Verifier 随机挑战替换为 transcript hash，并梳理其安全边界。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "FS",
    learningTrack: "proof-systems",
    learningOrder: 4,
    learningLabel: "NIZK 与 Fiat–Shamir"
  },

  {
    id: 6,
    file: "posts/knowledge-soundness.html",
    title: "Knowledge Soundness 与现代证明系统",
    tag: "证明系统与零知识证明",
    date: "2026-08-02",
    excerpt: "从普通 Soundness 的边界出发，引入 Extractor 与 Knowledge Soundness，并对照 Simulator，梳理 NIZK、SNARK、STARK、Bulletproofs 与 Sumcheck 的关系和取舍。",
    readTime: "约 15 分钟",
    cover: "",
    emoji: "PoK",
    learningTrack: "proof-systems",
    learningOrder: 5,
    learningLabel: "知识可靠性"
  },

  {
    id: 2,
    file: "posts/sumcheck-protocol-notes.html",
    title: "Sumcheck Protocol：逐轮压缩求和",
    tag: "证明系统与零知识证明",
    date: "2026-07-31",
    excerpt: "使用 T、P_i、M_i、r_i 的直观符号体系，以有限域 F_17 上的三变量多项式完整演示 Prover 与 Verifier 如何逐轮压缩求和声明。",
    readTime: "约 12 分钟",
    cover: "",
    emoji: "∑",
    learningTrack: "proof-systems",
    learningOrder: 6,
    learningLabel: "Sumcheck 协议"
  },

  {
    id: 19,
    file: "posts/multilinear-extension.html",
    title: "Multilinear Extension：从 Boolean Table 到低度多项式",
    tag: "证明系统与零知识证明",
    date: "2026-08-03",
    excerpt: "从一维 Boolean Lagrange basis 出发，解释固定 basis、唯一多线性扩展、同一 basis 如何表示不同 table，以及随机有限域点求值在 Sumcheck 和 GKR 中的意义。",
    readTime: "约 16 分钟",
    cover: "",
    emoji: "MLE",
    learningTrack: "proof-systems",
    learningOrder: 7,
    learningLabel: "Multilinear Extension"
  },

  {
    id: 18,
    file: "posts/gkr-protocol-notes.html",
    title: "GKR Protocol：从电路执行到逐层多项式验证",
    tag: "证明系统与零知识证明",
    date: "2026-08-02",
    excerpt: "从分层电路与 gate-value table 出发，依次理解 Multilinear Extension、wiring predicate 与逐层 Sumcheck 归约，并通过数值例子和示意图串联 GKR 的完整验证主线。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "GKR",
    learningTrack: "proof-systems",
    learningOrder: 8,
    learningLabel: "GKR 协议"
  },

  {
    id: 20,
    file: "posts/kzg-polynomial-commitment.html",
    title: "KZG Polynomial Commitment：从指数编码到点值证明",
    tag: "证明系统与零知识证明",
    date: "2026-08-03",
    excerpt: "从 Gen、Com、Open 与 Ver 四个算法出发，理解 KZG 如何利用隐藏点的 SRS 编码 polynomial commitment，并通过 quotient polynomial 与 bilinear pairing 验证指定点上的 evaluation。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "KZG",
    learningTrack: "proof-systems",
    learningOrder: 9,
    learningLabel: "KZG Polynomial Commitment"
  },

  {
    id: 23,
    file: "posts/from-gkr-to-snarg.html",
    title: "From GKR to SNARG：从交互式电路验证到简洁非交互论证",
    tag: "证明系统与零知识证明",
    date: "2026-08-04",
    excerpt: "从 GKR 的深度限制和未知输入问题出发，引入 circuit flattening、Polynomial Commitment 与 Fiat–Shamir，梳理一般 NP witness 如何转化为 Succinct Non-Interactive Argument。",
    readTime: "约 18 分钟",
    cover: "",
    emoji: "SNARG",
    learningTrack: "proof-systems",
    learningOrder: 10,
    learningLabel: "From GKR to SNARG"
  },

  // ============================================================
  // 学习路线二：秘密共享与安全多方计算
  // ============================================================

  {
    id: 13,
    file: "posts/shamir-secret-sharing.html",
    title: "Shamir Secret Sharing（SSS，Shamir 秘密共享）",
    tag: "密码学",
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
    tag: "密码学",
    date: "2026-08-04",
    excerpt: "从 Shamir 份额上的公开算术电路出发，解释加法门、乘法后的重新随机化与次数约简、Vandermonde 线性变换以及最终输出重构，建立经典 BGW 安全多方计算的完整主线。",
    readTime: "约 20 分钟",
    cover: "",
    emoji: "BGW",
    learningTrack: "mpc",
    learningOrder: 2,
    learningLabel: "BGW 协议"
  },

  // ============================================================
  // 其他密码学基础篇章
  // ============================================================

  {
    id: 7,
    file: "posts/des.html",
    title: "Data Encryption Standard（DES，数据加密标准）",
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
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
    tag: "密码学",
    date: "2026-08-02",
    excerpt: "从 128 位分组和密钥出发，拆解 SM4 的 32 轮结构、S-box、线性变换与密钥扩展，并核对国家标准测试向量。",
    readTime: "约 12 分钟",
    cover: "",
    emoji: "SM4"
  }

];