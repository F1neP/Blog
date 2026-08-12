(function () {
  'use strict';

  const T = String.raw;
  const d = (label, tex, text) => ({ label, tex, text });
  const r = (phase, from, to, message, pub, secret, check) => ({ phase, from, to, message, public: pub, secret, check });
  const s = (from, to, label, note) => ({ from, to, label, note });

  const pages = {
    'aes.html': {
      intro: '这里只形式化 FIPS 197 定义的 AES 分组密码本身；工作模式、Nonce 和网络传输由其他标准另行规定。',
      hideSequence: true,
      specs: [{
        title: 'AES 分组加密与解密算法',
        note: 'AES 是固定的本地算法，没有协议发送方；表中的调用者和 AES 实现只表示本地输入、状态变换与输出。',
        definitions: [
          d('算法族', T`E:\{0,1\}^{\kappa}\times\{0,1\}^{128}\to\{0,1\}^{128},\quad D:\{0,1\}^{\kappa}\times\{0,1\}^{128}\to\{0,1\}^{128}`, 'κ∈{128,192,256}；对应轮数 N_r∈{10,12,14}。'),
          d('中间轮', T`S_i=\operatorname{ARK}_{K_i}(\operatorname{MC}(\operatorname{SR}(\operatorname{SB}(S_{i-1}))))`, 'i=1,…,N_r−1；末轮省略 MixColumns。'),
          d('正确性', T`\forall K,P:\quad D_K(E_K(P))=P`, '解密按逆序轮密钥执行逆变换。')
        ],
        rows: [
          r('密钥扩展', 'AES 实现', '本地轮密钥状态', '由 [[K]] 生成 [[K_0,…,K_{N_r}]]。', 'S-box、Rcon、密钥长度', '[[K]]、全部轮密钥', '轮密钥数量和字节排列符合 FIPS 197。'),
          r('初始轮', 'AES 实现', '本地状态 [[S_0]]', '把 128 位 [[P]] 按列装入状态并执行 [[S_0=P⊕K_0]]。', '状态布局规则', '[[K_0]]；[[P]] 是否秘密由应用决定', '状态字节顺序正确。'),
          r('中间轮', 'AES 实现', '本地状态 [[S_i]]', '依次执行 SubBytes、ShiftRows、MixColumns、AddRoundKey。', '固定 S-box 和线性变换', '[[S_{i-1}]]、[[K_i]]', '执行 [[N_r-1]] 个完整轮。'),
          r('最终轮', 'AES 实现', '调用者', '执行 SubBytes、ShiftRows、AddRoundKey，按列输出 [[C]]。', '算法参数；[[C]] 通常可公开', '[[K_{N_r}]]、内部状态', '末轮不得执行 MixColumns。'),
          r('解密', 'AES 实现', '调用者', '以逆序轮密钥执行对应逆变换，输出 [[P]]。', '密文 [[C]]、算法参数', '[[K]]、恢复的 [[P]]', '[[D_K(C)=P]]。')
        ],
        sequence: []
      }]
    },

    'des.html': {
      intro: 'DES 的形式化接口与分组置换概念仍有教学价值，但 56 位有效密钥已经不满足现实安全要求。',
      hideSequence: true,
      specs: [{
        title: 'DES 分组置换（仅用于理解，不用于部署）',
        note: '下表只描述 FIPS 46-3 的固定分组算法；DES 已不满足现实安全要求，不应部署。',
        definitions: [
          d('算法族', T`E:\{0,1\}^{56}\times\{0,1\}^{64}\to\{0,1\}^{64},\quad D_K(C)=E_K^{-1}(C)`, '64 位外部密钥编码含 8 个校验位，实际参与运算的是 56 位。'),
          d('轮递推', T`L_i=R_{i-1},\qquad R_i=L_{i-1}\oplus f(R_{i-1},K_i)`, '解密使用相同 Feistel 结构并逆序使用 K_16,…,K_1。'),
          d('正确性', T`\forall K,P:\quad D_K(E_K(P))=P`, '可逆性成立不代表计算安全；密钥空间过小使穷举可行。')
        ],
        rows: [
          r('密钥调度', '本地实现', '本地实现', 'PC-1、循环移位与 PC-2 产生 [[K_1,…,K_{16}]]。', '置换表、移位表', '[[K]]、轮密钥', '子密钥顺序与标准一致。'),
          r('加密', 'DES 实现', '本地状态', '[[IP]] 后执行 16 轮 Feistel，再交换并执行 [[IP^{-1}]]。', '算法与 64 位输入格式', '[[K]]、[[P]]、内部状态', '输出 [[C=E_K(P)]]。'),
          r('解密', 'DES 实现', '调用者', '以 [[K_{16},…,K_1]] 的逆序执行同一 Feistel 结构。', '密文 [[C]]', '[[K]]、恢复的 [[P]]', '[[D_K(C)=P]]；该正确性不代表现实安全。')
        ],
        sequence: []
      }]
    },

    'sm4.html': {
      intro: '这里只形式化 GB/T 32907 定义的 SM4 分组密码本身，不把未指定的工作模式或网络协议混入算法表。',
      hideSequence: true,
      specs: [{
        title: 'SM4 分组加密与解密算法',
        note: 'SM4 是固定的本地算法：128 位密钥、128 位分组和 32 轮迭代。',
        definitions: [
          d('算法族', T`E:\{0,1\}^{128}\times\{0,1\}^{128}\to\{0,1\}^{128},\quad D_K=E_K^{-1}`, '固定 K 时，SM4_K 是 128 位分组上的置换。'),
          d('轮递推', T`X_{i+4}=X_i\oplus L\!\left(\tau(X_{i+1}\oplus X_{i+2}\oplus X_{i+3}\oplus rk_i)\right)`, 'i=0,…,31；密文为 (X_35,X_34,X_33,X_32)。'),
          d('正确性', T`\forall K,P:\quad D_K(E_K(P))=P`, '模式层安全必须另外定义，不能由轮函数可逆性推出。')
        ],
        rows: [
          r('密钥扩展', 'SM4 实现', '本地轮密钥状态', '[[K]] 与 FK、CK 常量生成 [[rk_0,…,rk_{31}]]。', 'FK、CK、S-box', '[[K]]、[[rk_i]]', '轮密钥顺序符合标准。'),
          r('输入', '调用者', 'SM4 实现', '输入 128 位 [[P]] 和 128 位 [[K]]，拆分 [[P=(X_0,X_1,X_2,X_3)]]。', '分组和字序规则', '[[K]]；[[P]] 是否秘密由应用决定', '四个字均为 32 位。'),
          r('32 轮迭代', 'SM4 实现', '本地状态', '对 [[i=0,…,31]] 计算 [[X_{i+4}=F(X_i,…,X_{i+3},rk_i)]]。', '轮函数和常量', '[[X_i]]、[[rk_i]]', '所有异或和循环移位按 32 位字执行。'),
          r('输出', 'SM4 实现', '调用者', '反序连接 [[(X_{35},X_{34},X_{33},X_{32})]]，输出 [[C]]。', '密文 [[C]]、算法参数', '[[K]]、内部状态', '[[C=E_K(P)]]。'),
          r('解密', 'SM4 实现', '调用者', '使用 [[rk_{31},…,rk_0]] 重复相同轮结构。', '密文 [[C]]', '[[K]]、恢复的 [[P]]', '[[D_K(C)=P]]。')
        ],
        sequence: []
      }]
    },

    'sha1.html': {
      intro: 'SHA-1 是无密钥确定性散列函数，不存在协议意义上的秘密输入或接收方；其碰撞安全性已被实际攻击破坏。',
      hideSequence: true,
      specs: [{
        title: 'SHA-1 散列函数',
        note: '表中“调用者→散列实现”表示本地数据流，不表示网络协议。',
        definitions: [
          d('函数接口', T`H:\{0,1\}^{*}\to\{0,1\}^{160},\qquad h=H(M)`, '相同消息总得到相同摘要；算法没有密钥。'),
          d('碰撞安全', T`\Pr[(M,M')\leftarrow\mathcal A:\ M\neq M'\land H(M)=H(M')]\leq\operatorname{negl}(\lambda)`, '这是理想目标；SHA-1 已不满足可接受的碰撞安全性。'),
          d('原像安全', T`\Pr[M'\leftarrow\mathcal A(H(M)):\ H(M')=H(M)]\text{ 很小}`, '原像、第二原像与碰撞是不同性质；不能相互替代。')
        ],
        rows: [
          r('预处理', '调用者', 'SHA-1 实现', '输入任意长度 [[M]]；追加 1、零填充和 64 位长度编码。', '算法和输入长度', '无算法秘密；[[M]] 可能是应用秘密', '填充后长度是 512 的倍数且长度编码无歧义。'),
          r('压缩', 'SHA-1 实现', 'SHA-1 实现', '逐个 512 位分组扩展 [[W_0,…,W_{79}]] 并更新 5 个 32 位链值。', '常量、布尔函数', '中间状态（仅实现层敏感）', '所有加法按模 [[2^{32}]]，分组顺序正确。'),
          r('输出', 'SHA-1 实现', '调用者', '连接最终 [[H_0∥⋯∥H_4]]，输出 160 位 [[h]]。', '[[h]] 通常公开', '无', '[[h]] 与标准测试向量一致。')
        ],
        sequence: []
      }]
    },

    'hmac.html': {
      intro: 'HMAC 是共享密钥消息认证码：发送方发送公开消息和标签，接收方用同一秘密密钥验证。',
      specs: [{
        title: 'HMAC 生成与验证',
        note: 'HMAC 提供对称认证，不隐藏消息，也不能向第三方区分究竟是哪位持钥方生成了标签。',
        definitions: [
          d('MAC 接口', T`\Pi_{\mathrm{MAC}}=(\operatorname{Gen},\operatorname{Mac},\operatorname{Vrfy})`, 'Gen 产生 K；Mac_K(M) 产生标签；Vrfy_K(M,T)∈{0,1}。'),
          d('HMAC', T`\operatorname{HMAC}_K(M)=H((K'\oplus\mathrm{opad})\parallel H((K'\oplus\mathrm{ipad})\parallel M))`, 'K′ 被规范化为散列分组长度。'),
          d('正确性', T`\Pr[K\leftarrow\operatorname{Gen}:\operatorname{Vrfy}_K(M,\operatorname{Mac}_K(M))=1]=1`, '实现允许的截断长度也必须被协议固定。'),
          d('EUF-CMA', T`\Pr[\operatorname{Vrfy}_K(M^*,T^*)=1\land M^*\notin Q_{\mathrm{Mac}}]\leq\operatorname{negl}(\lambda)`, '攻击者可查询自选消息标签，但不能为新消息伪造有效标签。')
        ],
        rows: [
          r('密钥建立', '密钥管理层', '发送方与接收方', '安全配置共享随机密钥 [[K]]，并绑定算法和用途。', '密钥标识/套件', '[[K]]', '只有授权实体持有 [[K]]；不同用途密钥分离。'),
          r('生成', '发送方本地', '发送方本地', '[[T←HMAC_K(context∥M)]]，必要时按固定长度截断。', '[[context]]、[[M]]、算法', '[[K]]', '编码唯一；身份、会话、方向、序列号按需进入 context。'),
          r('传输', '发送方', '接收方', '发送 [[(context,M,T)]]。', '整条报文通常公开', '[[K]]', '接收方解析出与生成端完全相同的字节串。'),
          r('验证', '接收方本地', '接收方本地', '常数时间比较 [[T]] 与 [[HMAC_K(context∥M)]]。', '[[context]]、[[M]]、[[T]]', '[[K]]', '匹配则接受；失败统一拒绝并执行重放检查。')
        ],
        sequence: [
          s('密钥管理层', '发送方/接收方', '共享 K', 'K 通过受保护机制配置。'),
          s('发送方', '发送方', 'T ← HMAC_K(context∥M)', '本地生成标签。'),
          s('发送方', '接收方', 'context, M, T', '消息公开，标签提供完整性和来源认证。'),
          s('接收方', '接收方', 'Vrfy_K(context∥M,T)', '再结合序列号/Nonce 拒绝重放。')
        ]
      }]
    },

    'diffie-hellman.html': {
      intro: '这里只形式化经典 Diffie–Hellman 共享秘密计算；认证、KDF 和密钥确认属于具体握手协议，不写成 DH 核心算法的一部分。',
      specs: [{
        title: '经典 Diffie–Hellman 密钥协商',
        note: '这是公认的两消息核心协议，但它不认证身份，不能单独抵抗中间人攻击。',
        definitions: [
          d('参数', T`pp=(\mathbb G,q,g),\qquad |\mathbb G|=q`, '双方必须使用同一已验证的素数阶群或标准曲线子群。'),
          d('交换', T`a,b\xleftarrow{\$}\mathbb Z_q;\ A=g^a;\ B=g^b;\ Z_A=B^a=Z_B=A^b=g^{ab}`, 'A、B 公开；a、b 和 Z 秘密。'),
          d('正确性', T`\operatorname{Agree}(a,B)=B^a=g^{ab}=A^b=\operatorname{Agree}(b,A)`, '双方在收到合法群元素时得到相同共享群元素。'),
          d('安全边界', T`(g,g^a,g^b)\ \not\Rightarrow\ \text{efficient computation of }g^{ab}`, '核心保密性依赖 CDH 类困难性；裸协议不提供实体认证。')
        ],
        rows: [
          r('公共参数', '参数生成方/标准', 'Alice 与 Bob', '固定素数阶群 [[G]]、阶 [[q]] 和生成元 [[g]]。', '[[pp=(G,q,g)]]', '无', '参数属于允许列表且群表示无歧义。'),
          r('第一消息', 'Alice', 'Bob', '采样 [[a\\xleftarrow{\\$}\\mathbb{Z}_q]]，计算并发送 [[A=g^a]]。', '[[pp]]、[[A]]', '[[a]]', 'Bob 检查 [[A]] 是合法且非单位元的目标子群元素。'),
          r('第二消息', 'Bob', 'Alice', '采样 [[b\\xleftarrow{\\$}\\mathbb{Z}_q]]，计算并发送 [[B=g^b]]。', '[[pp]]、[[B]]', '[[b]]', 'Alice 检查 [[B]] 是合法且非单位元的目标子群元素。'),
          r('Alice 计算', 'Alice 本地', 'Alice 本地', '计算 [[Z_A=B^a]]。', '[[pp]]、[[A]]、[[B]]', '[[a]]、[[Z_A]]', '不得把 [[a]] 或 [[Z_A]] 作为协议消息发送。'),
          r('Bob 计算', 'Bob 本地', 'Bob 本地', '计算 [[Z_B=A^b]]。', '[[pp]]、[[A]]、[[B]]', '[[b]]、[[Z_B]]', '验证 [[Z_A=Z_B]] 的代数正确性；核心协议本身没有密钥确认消息。')
        ],
        sequence: [
          s('Alice', 'Bob', 'A=gᵃ', 'a←$Z_q；Bob 验证 A 的群成员关系。'),
          s('Bob', 'Alice', 'B=gᵇ', 'b←$Z_q；Alice 验证 B 的群成员关系。'),
          s('Alice', 'Alice', 'Z_A=Bᵃ', 'a 和 Z_A 保密。'),
          s('Bob', 'Bob', 'Z_B=Aᵇ', 'b 和 Z_B 保密；Z_A=Z_B=gᵃᵇ。')
        ]
      }]
    },

    'elgamal.html': {
      intro: 'ElGamal 公钥加密包含 KeyGen、随机化 Enc 和 Dec 三个算法；发送方传输两个群元素组成的密文。',
      specs: [{
        title: 'ElGamal 公钥加密',
        note: '经典群元素版本在 DDH 假设下可达到 IND-CPA，但天然可塑，不能直接声称 IND-CCA。',
        definitions: [
          d('密钥生成', T`x\xleftarrow{\$}\mathbb Z_q,\quad pk=(\mathbb G,q,g,y=g^x),\quad sk=x`, '消息空间取群 G；实际编码必须明确。'),
          d('加密', T`k\xleftarrow{\$}\mathbb Z_q,\quad \operatorname{Enc}_{pk}(m;k)=(c_1,c_2)=(g^k,m\cdot y^k)`, '每次加密必须使用新鲜、不可预测的 k。'),
          d('解密', T`\operatorname{Dec}_{x}(c_1,c_2)=c_2/(c_1^x)=m`, '接收端还应验证 c_1,c_2 的群成员关系。'),
          d('IND-CPA', T`\left|\Pr[b'=b]-\tfrac12\right|\leq\operatorname{negl}(\lambda)`, '该结论依赖精确群模型和 DDH；乘法同态意味着密文可被非授权修改。')
        ],
        rows: [
          r('KeyGen', '接收方 Bob', '公开目录/发送方', '生成 [[x]]，发布 [[pk=(pp,y=g^x)]]。', '[[pp]]、[[y]]', '[[x]]', '[[y]] 属于正确子群；私钥 [[x]] 不泄露。'),
          r('Enc', '发送方 Alice 本地', 'Alice 本地', '验证 [[pk]]，采样 [[k]]，计算 [[c_1=g^k,\\ c_2=m\\cdot y^k]]。', '[[pp]]、[[pk]]', '[[m]]、[[k]]', '[[k]] 新鲜；[[m]] 编码为合法群元素。'),
          r('传输', 'Alice', 'Bob', '发送 [[C=(c_1,c_2)]] 及固定算法上下文。', '[[C]]、算法标识', '[[m]]、[[k]]、[[x]]', '编码唯一并拒绝非法群元素。'),
          r('Dec', 'Bob 本地', 'Bob 本地', '计算 [[m=c_2/(c_1^x)]]。', '[[C]]', '[[x]]、恢复的 [[m]]', '若需要完整性，必须由经证明的 CCA 安全封装提供。')
        ],
        sequence: [
          s('Bob', 'Alice/公钥目录', 'pk=(pp,y=gˣ)', 'x 始终由 Bob 保密。'),
          s('Alice', 'Alice', 'k←$Z_q；C=(gᵏ,m·yᵏ)', 'k 每次新鲜且不发送。'),
          s('Alice', 'Bob', 'C=(c₁,c₂)', '两个群元素均公开。'),
          s('Bob', 'Bob', 'm=c₂/(c₁ˣ)', '先验证密文元素合法性。')
        ]
      }]
    },

    'rsa.html': {
      intro: 'RSA 原语必须与标准编码组合。下面分别形式化 RSA-OAEP 加密和 RSA-PSS 签名，避免把“裸模幂”误当成安全方案。',
      specs: [
        {
          title: 'RSA-OAEP 公钥加密',
          note: 'OAEP 的随机化编码、长度限制和错误处理属于方案定义的一部分。',
          definitions: [
            d('密钥生成', T`p,q\leftarrow\operatorname{PrimeGen};\ n=pq;\ \gcd(e,\lambda(n))=1;\ d=e^{-1}\bmod\lambda(n)`, 'pk=(n,e)，sk 可保存 d 或 CRT 参数 p,q,d_P,d_Q,q_inv。'),
            d('加密', T`EM\leftarrow\operatorname{OAEP.Encode}(M,L;r),\qquad C=EM^e\bmod n`, 'r 是新鲜随机种子；L 是必须一致处理的可选标签。'),
            d('解密', T`EM=C^d\bmod n,\qquad M/\bot\leftarrow\operatorname{OAEP.Decode}(EM,L)`, '任何解码错误都应统一返回 ⊥，避免形成解密预言机。'),
            d('正确性', T`\Pr[\operatorname{Dec}_{sk}(\operatorname{Enc}_{pk}(M;r))=M]=1`, '安全性属于 RSA-OAEP 的具体模型，不属于裸 RSA 置换。')
          ],
          rows: [
            r('KeyGen', '接收方 Bob', '公钥目录', '生成强素数因子和密钥，发布 [[(n,e)]]。', '[[n]]、[[e]]、参数标识', '[[p]]、[[q]]、[[d]]、CRT 参数', '模数长度和随机源满足规范；私钥完整性受保护。'),
            r('Enc', '发送方 Alice 本地', 'Alice 本地', '[[OAEP.Encode(M,L;r)]] 后计算 [[C=EM^e\\bmod n]]。', '[[pk]]、[[L]]', '[[M]]、[[r]]', '消息长度合法；[[r]] 新鲜；不得使用裸 RSA。'),
            r('传输', 'Alice', 'Bob', '发送 [[(alg,L,C)]] 或由协议固定 [[L]]。', '算法与 [[C]]', '[[M]]、[[r]]、[[sk]]', '算法标识和上下文不可被替换。'),
            r('Dec', 'Bob 本地', 'Bob 本地', '私钥模幂并 OAEP 解码；失败返回统一 [[\\bot]]。', '[[C]]、[[L]]', '[[sk]]、[[M]]', '不泄露填充失败类型或时间差。')
          ],
          sequence: [
            s('Bob', 'Alice/公钥目录', 'pk=(n,e)', 'sk=(p,q,d,CRT) 不发送。'),
            s('Alice', 'Alice', 'C=RSAEP(pk,OAEP.Encode(M,L;r))', 'r 新鲜。'),
            s('Alice', 'Bob', 'alg, L, C', 'C 和参数公开。'),
            s('Bob', 'Bob', 'M/⊥=OAEP.Decode(RSADP(sk,C),L)', '统一错误处理。')
          ]
        },
        {
          title: 'RSA-PSS 数字签名',
          note: '签名证明“持有私钥的实体对编码消息产生了签名”，不提供消息机密性。',
          definitions: [
            d('签名', T`EM\leftarrow\operatorname{PSS.Encode}(H(M),salt),\qquad \sigma=EM^d\bmod n`, 'salt 长度、散列和参数必须固定。'),
            d('验证', T`EM'=\sigma^e\bmod n,\qquad \operatorname{PSS.Verify}(H(M),EM')\in\{0,1\}`, '验证方仅使用公钥。'),
            d('EUF-CMA', T`\Pr[\operatorname{Vrfy}_{pk}(M^*,\sigma^*)=1\land M^*\notin Q_{\mathrm{Sign}}]\leq\operatorname{negl}(\lambda)`, '攻击者可查询选择消息签名，但不能为新消息伪造。')
          ],
          rows: [
            r('Sign', '签名者', '签名者本地', '对 [[domain∥context∥M]] 做 PSS 编码并用 [[sk]] 签名。', '[[domain]]、[[context]]、[[M]]、参数', '[[sk]]、[[salt]]', '编码唯一；私钥操作抗故障和侧信道。'),
            r('传输', '签名者', '验证者', '发送 [[(context,M,σ)]] 或可唯一恢复 [[M]] 的引用。', '[[context]]、[[M]]、[[σ]]', '[[sk]]', '上下文与消息不可被重新解释。'),
            r('Verify', '验证者本地', '验证者本地', '用 [[pk]] 执行 RSAVP1 与 PSS.Verify。', '[[pk]]、[[M]]、[[σ]]、参数', '无', '全部检查通过才接受；参数不匹配即拒绝。')
          ],
          sequence: [
            s('签名者', '签名者', 'σ=RSASSA-PSS.Sign_sk(context∥M)', '私钥不发送。'),
            s('签名者', '验证者', 'context, M, σ', 'M 通常公开。'),
            s('验证者', '验证者', 'RSASSA-PSS.Verify_pk(context∥M,σ)', '输出 accept/reject。')
          ]
        }
      ]
    },

    'sm2.html': {
      intro: '本篇讨论的是 SM2 公钥加密。发送方用接收方公钥和一次性随机数构造 C₁、C₂、C₃，接收方用私钥恢复并校验。',
      specs: [{
        title: 'SM2 公钥加密算法',
        note: '密文分量顺序、曲线参数、点编码、KDF 和散列算法都必须由协议固定，不能由接收端猜测。',
        definitions: [
          d('密钥生成', T`d_B\xleftarrow{\$}\{1,\ldots,n-2\},\qquad P_B=[d_B]G`, 'P_B 公开，d_B 由接收方 Bob 保密。'),
          d('加密', T`k\xleftarrow{\$}\{1,\ldots,n-1\};\ C_1=[k]G;\ (x_2,y_2)=[k]P_B;\ t=\operatorname{KDF}(x_2\parallel y_2,klen)`, '若 t 全零必须重新采样 k。'),
          d('密文', T`C_2=M\oplus t,\qquad C_3=H(x_2\parallel M\parallel y_2),\qquad C=C_1\parallel C_3\parallel C_2`, '分量顺序以本文采用的规范格式为准。'),
          d('解密正确性', T`[d_B]C_1=[d_B][k]G=[k]P_B,\quad M'=C_2\oplus\operatorname{KDF}(x_2'\parallel y_2',klen)`, '仅当 H(x′₂∥M′∥y′₂)=C₃ 时才输出 M′，否则输出 ⊥。')
        ],
        rows: [
          r('KeyGen', '接收方 Bob', '公钥目录/发送方', '生成 [[d_B]]，发布 [[P_B=[d_B]G]]。', '[[pp]]、[[P_B]]', '[[d_B]]', '[[P_B]] 是合法非无穷远子群点并绑定 Bob 身份。'),
          r('Enc-点乘', '发送方 Alice 本地', 'Alice 本地', '验证 [[P_B]]，采样 [[k]]，计算 [[C_1=[k]G]] 和 [[ [k]P_B=(x_2,y_2) ]]。', '[[pp]]、[[P_B]]', '[[k]]、[[M]]、共享点', '[[k]] 新鲜；公钥验证完整；若 KDF 全零则重采样。'),
          r('Enc-封装', 'Alice 本地', 'Alice 本地', '计算 [[t]]、[[C_2=M⊕t]]、[[C_3=H(x_2∥M∥y_2)]]，编码 [[C]]。', '算法/编码参数', '[[M]]、[[k]]、[[t]]', '长度和连接编码唯一。'),
          r('传输', 'Alice', 'Bob', '发送 [[C=C_1∥C_3∥C_2]]。', '完整密文 [[C]]', '[[M]]、[[k]]、[[d_B]]', '分量顺序和点编码固定。'),
          r('Dec', 'Bob 本地', 'Bob 本地', '验证 [[C_1]]，计算 [[[d_B]C_1]]，恢复 [[M\\prime]] 并核对 [[C_3]]。', '[[C]]、[[pp]]', '[[d_B]]、[[M\\prime]]、共享点', '摘要相等才输出 [[M\\prime]]；任一失败统一返回 [[\\bot]]。')
        ],
        sequence: [
          s('Bob', 'Alice/公钥目录', 'P_B=[d_B]G', 'd_B 从不发送。'),
          s('Alice', 'Alice', 'C₁=[k]G；t=KDF([k]P_B)', 'k 每次新鲜。'),
          s('Alice', 'Alice', 'C₂=M⊕t；C₃=H(x₂∥M∥y₂)', '形成固定编码密文。'),
          s('Alice', 'Bob', 'C₁ ∥ C₃ ∥ C₂', '密文公开。'),
          s('Bob', 'Bob', '[d_B]C₁ → M′；检查 C₃', '检查通过输出 M′，否则 ⊥。')
        ]
      }]
    },

    'shamir-secret-sharing.html': {
      intro: 'Shamir 秘密共享由一个 Dealer 私下向 n 个参与方发送份额；任何达到门限的集合可重构，低于门限的集合对秘密没有信息。',
      specs: [{
        title: 'Shamir (t,n) 门限秘密共享',
        note: '这里 t 表示最少重构份额数，因此随机多项式次数是 t−1。',
        definitions: [
          d('分享', T`s\in\mathbb F;\ a_1,\ldots,a_{t-1}\xleftarrow{\$}\mathbb F;\ f(X)=s+\sum_{j=1}^{t-1}a_jX^j;\ [s]_i=f(\alpha_i)`, '公开非零且互异的 α_i；每个 P_i 只收到自己的份额 [s]_i。'),
          d('重构', T`s=f(0)=\sum_{i\in I}[s]_i\lambda_i^{I},\qquad \lambda_i^{I}=\prod_{j\in I,j\neq i}\frac{-\alpha_j}{\alpha_i-\alpha_j}`, '任意 |I|≥t 的集合可在 0 点插值。'),
          d('正确性', T`\forall I\subseteq[n],\ |I|\ge t:\quad \operatorname{Rec}(\{(\alpha_i,[s]_i)\}_{i\in I})=s`, '无错误份额时成立。'),
          d('完美隐私', T`\forall J,|J|<t,\ \forall s_0,s_1:\quad \{[s_0]_j\}_{j\in J}\equiv\{[s_1]_j\}_{j\in J}`, '分布完全相同，且需私密信道和均匀随机系数。')
        ],
        rows: [
          r('Setup', '系统/参与方', 'Dealer 与 [[P_1,…,P_n]]', '固定 [[\\mathbb F]]、[[t]]、[[n]] 和互异非零 [[α_i]]。', '[[\\mathbb F]]、[[t]]、[[n]]、[[α_i]]', '无', '字段编码和参与方到 [[α_i]] 的映射唯一。'),
          r('Share', 'Dealer 本地', 'Dealer 本地', '采样 [[a_1,…,a_{t-1}]] 并计算 [[f]]。', '参数', '[[s]]、[[a_j]]、[[f]]', '随机系数均匀且使用安全随机源。'),
          r('Distribute', 'Dealer', '每个 [[P_i]]', '通过私密且认证的信道分别发送 [[[s]_i=f(α_i)]]。', '发送关系/元数据', '传输中的 [[[s]_i]]', '[[P_i]] 收到与身份 [[i]] 绑定的份额；其他参与方不可见。'),
          r('Reconstruct', '集合 [[I]] 中的 [[P_i]]', '重构者', '成员发送 [[(α_i,[s]_i)]]，重构者用拉格朗日插值得 [[s]]。', '[[I]]、[[α_i]]；重构时份额会暴露给重构者', '重构前各份额、重构后的 [[s]]', '至少 [[t]] 个一致份额；恶意份额需 VSS/纠错检测。')
        ],
        sequence: [
          s('Dealer', 'Dealer', 'f(X)=s+Σa_jXʲ', 's=f(0)，次数 t−1。'),
          s('Dealer', 'P_i', '[s]_i=f(α_i)（私密认证信道）', '对每个 i 分别发送，不能广播。'),
          s('P_i（i∈I）', '重构者', '(α_i,[s]_i)', '|I|≥t；此阶段份额向重构者公开。'),
          s('重构者', '重构者', 's=Σ_{i∈I} λ_i^I[s]_i', '错误份额不在基础 Shamir 模型内。')
        ]
      }]
    },

    'bgw-protocol.html': {
      intro: 'BGW 把每条线路值表示为 Shamir 份额。本文沿用正文记号：t 是最多腐化方数，因此共享多项式次数为 t。加法门本地完成；乘法门先把次数从 t 提升到 2t，再通过重新分享和线性组合降回 t。',
      specs: [{
        title: 'BGW 算术电路安全计算（被动安全主线）',
        note: '下表采用 t 表示最多 t 个被动腐化方，要求 n>2t。Shamir 专篇把 t 用作最小重构份额数，两页记号含义不同。主动安全版本还需要 VSS、广播和 n>3t 等条件，不能由此表自动推出。',
        definitions: [
          d('功能', T`(y_1,\ldots,y_n)=F(x_1,\ldots,x_n)`, '公开算术电路 C 在有限域 F 上计算 F；各 P_i 只应获准知道自己的输出。'),
          d('输入分享', T`f_i(0)=x_i,\quad \deg f_i\le t,\quad [x_i]_j=f_i(\alpha_j)`, 'P_i 作为自己输入的 Dealer，私发一个份额给每个 P_j。'),
          d('乘法局部值', T`h_i=[a]_i[b]_i,\qquad h(0)=ab,\quad \deg h\le2t`, 'h_i 不能直接继续作为 t 次共享，必须降次。'),
          d('降次', T`h(0)=\sum_{i=1}^{n}\lambda_i h_i;\quad h_i\xrightarrow{\mathrm{reshare}}[h_i]_j;\quad [ab]_j=\sum_{i=1}^{n}\lambda_i[h_i]_j`, 'λ_i 是用公开评估点在 0 点插值的系数。'),
          d('模拟安全', T`\operatorname{REAL}_{\Pi,\mathcal A}(\mathbf x)\approx\operatorname{IDEAL}_{F,\mathcal S}(\mathbf x)`, '需明确腐化模型、网络、输出和中止行为；这里对应同步私密认证信道下的被动安全主线。')
        ],
        rows: [
          r('输入分享', '每个输入方 [[P_i]]', '每个 [[P_j]]', '私发 [[[x_i]_j=f_i(α_j)]]，其中 [[f_i(0)=x_i]]、[[deg(f_i)≤t]]。', '[[\\mathbb F]]、[[α_j]]、输入归属', '[[x_i]]、[[f_i]]、[[[x_i]_j]]', '私密认证信道；接收方仅保存自己的份额。'),
          r('加法门', '每个 [[P_j]] 本地', '[[P_j]] 本地', '计算 [[[c]_j=[a]_j+[b]_j]] 或 [[[c]_j=γ[a]_j]]。', '门类型、公开常数 [[γ]]', '线路份额', '线性运算保持次数 [[t]] 且常数项正确。'),
          r('乘法-局部', '每个 [[P_i]] 本地', '[[P_i]] 本地', '计算 [[h_i=[a]_i[b]_i]]。', '乘法门标识', '[[[a]_i]]、[[[b]_i]]、[[h_i]]', '[[h_i]] 是次数 [[≤2t]] 的乘积共享上的一个点。'),
          r('乘法-重分享', '每个 [[P_i]]', '每个 [[P_j]]', '[[P_i]] 以 [[h_i]] 为常数项采样 [[t]] 次 [[q_i]]，并私发 [[q_i(α_j)]]。', '门标识、[[α_j]]', '[[h_i]]、[[q_i]]、[[q_i(α_j)]]', '每个 [[h_i]] 被重新随机化为新共享。'),
          r('乘法-降次', '每个 [[P_j]] 本地', '[[P_j]] 本地', '计算 [[[ab]_j=Σ_i λ_i q_i(α_j)]]。', '[[λ_i]]', '收到的子份额、[[[ab]_j]]', '常数项为 [[Σ_i λ_i h_i=ab]]，次数回到 [[t]]。'),
          r('输出重构', '获准输出的 [[P_i]]', '输出接收方', '发送输出线路份额并在 0 点插值。', '输出线路/接收集合', '输出份额、最终输出', '收集足够一致份额；基础被动协议不处理恶意错误份额。')
        ],
        sequence: [
          s('P_i（每个输入方）', 'P_j（每个参与方）', '[x_i]_j=f_i(α_j)', '逐接收方私发输入份额。'),
          s('所有 P_j', '各自本地', '加法门：份额逐点相加', '无通信。'),
          s('P_i', 'P_i', 'h_i=[a]_i[b]_i', '乘法门局部相乘，次数升高。'),
          s('P_i（每个 i）', 'P_j（每个 j）', 'q_i(α_j)，其中 q_i(0)=h_i', 'n×n 个私密子份额。'),
          s('P_j', 'P_j', '[ab]_j=Σ_iλ_iq_i(α_j)', '本地降次并重新随机化。'),
          s('输出持份者', '输出接收方', '输出线路份额', '插值得到授权输出。')
        ]
      }]
    },

    'commitment-schemes.html': {
      intro: '承诺协议有 Commit 和 Open 两个阶段：先隐藏地绑定消息，后公开消息与打开信息。下面先给一般定义，再列出 Naor 型交互承诺。',
      specs: [
        {
          title: 'Naor 型 PRG 承诺的交互消息',
          note: '该构造包含接收方先发随机串这一轮，因此不能被误写成单消息非交互承诺。',
          definitions: [
            d('参数', T`G:\{0,1\}^{n}\to\{0,1\}^{3n}`, 'G 是伪随机生成器。Receiver 先采样 R←{0,1}^{3n}。'),
            d('承诺', T`s\xleftarrow{\$}\{0,1\}^{n};\quad c=G(s)\oplus(b\cdot R)`, 'b∈{0,1}；b=0 时 c=G(s)，b=1 时 c=G(s)⊕R。'),
            d('打开', T`\operatorname{Vrfy}(R,c,b,s)=1\iff c=G(s)\oplus(b\cdot R)`, '发送 (b,s) 打开。')
          ],
          rows: [
            r('挑战', 'Receiver', 'Committer', '采样并发送 [[R←\\{0,1\\}^{3n}]]。', '[[R]]', 'Receiver 随机币', '[[R]] 均匀且与承诺前独立。'),
            r('Commit', 'Committer', 'Receiver', '采样 [[s]]，发送 [[c=G(s)⊕(b\\cdot R)]]。', '[[R]]、[[c]]', '[[b]]、[[s]]', '[[c]] 与本会话 [[R]] 绑定。'),
            r('Open', 'Committer', 'Receiver', '发送 [[(b,s)]]。', '[[b]]、[[s]]、[[R]]、[[c]]', '无', '检查 [[c=G(s)⊕(b\\cdot R)]]。')
          ],
          sequence: [
            s('Receiver', 'Committer', 'R ←$ {0,1}³ⁿ', '接收方的公共随机挑战。'),
            s('Committer', 'Receiver', 'c=G(s)⊕(b·R)', 'b、s 暂不发送。'),
            s('Committer', 'Receiver', 'b, s', '打开阶段。'),
            s('Receiver', 'Receiver', '检查 c=G(s)⊕(b·R)', '通过则接受 b。')
          ]
        }
      ]
    },

    'interactive-zk.html': {
      intro: '零知识是在完备性和可靠性之外要求“真实 verifier 视图可被模拟”。下面分别形式化通用三消息结构、二次剩余协议和三染色协议。',
      specs: [
        {
          title: '二次剩余 Sigma 协议',
          note: '证明者证明自己知道 w∈Z_N^* 使 y=w² mod N。群成员关系和可逆性检查不能省略。',
          definitions: [
            d('关系', T`R_{\mathrm{QR}}=\{((N,y),w):w\in\mathbb Z_N^*\land y\equiv w^2\pmod N\}`, '公共 statement 是 x=(N,y)。'),
            d('消息', T`r\xleftarrow{\$}\mathbb Z_N^*;\ a=r^2\bmod N;\ c\xleftarrow{\$}\{0,1\};\ z=r\,w^c\bmod N`, 'w 不发送。'),
            d('验证', T`z\in\mathbb Z_N^*\land z^2\equiv a\,y^c\pmod N`, '还需检查 N、y、a 的合法域条件。'),
            d('特殊可靠性', T`w=z_1z_0^{-1}\bmod N`, '同一 a 下对 c=0 和 c=1 的两个接受 transcript 可提取 w。')
          ],
          rows: [
            r('承诺', 'Prover', 'Verifier', '采样 [[r∈\\mathbb Z_N^*]]，发送 [[a=r^2\\bmod N]]。', '[[N]]、[[y]]、[[a]]', '[[w]]、[[r]]', '[[a∈\\mathbb Z_N^*]] 且会话新鲜。'),
            r('挑战', 'Verifier', 'Prover', '发送均匀 [[c∈\\{0,1\\}]]。', '[[c]]', '挑战前随机币', '[[c]] 独立且不可预测。'),
            r('响应', 'Prover', 'Verifier', '发送 [[z=r\\cdot w^c\\bmod N]]。', '[[z]]', '[[w]]、[[r]]', '[[z]] 编码合法。'),
            r('验证', 'Verifier 本地', 'Verifier 本地', '检查 [[z^2≡a\\cdot y^c\\pmod N]] 及群成员关系。', '完整 transcript', '无', '全部检查通过才接受。')
          ],
          sequence: [
            s('Prover(w)', 'Verifier', 'a=r² mod N', 'r←$Z_N*。'),
            s('Verifier', 'Prover(w)', 'c∈{0,1}', '均匀随机挑战。'),
            s('Prover(w)', 'Verifier', 'z=r·wᶜ mod N', 'w 不发送。'),
            s('Verifier', 'Verifier', '检查 z²=a·yᶜ mod N', '并检查所有元素合法。')
          ]
        },
        {
          title: '三染色零知识协议（单轮）',
          note: '证明者承诺随机置换后的所有顶点颜色；验证者只抽查一条边的两个端点。',
          definitions: [
            d('关系', T`R_{3\mathrm{COL}}=\{(G,\chi):\forall(u,v)\in E,\ \chi(u)\neq\chi(v),\ \chi:V\to\{1,2,3\}\}`, 'G=(V,E) 公开，合法染色 χ 是 witness。'),
            d('承诺', T`\pi\xleftarrow{\$}S_3;\ \hat\chi=\pi\circ\chi;\ c_v\leftarrow\operatorname{Commit}(\hat\chi(v);r_v)`, '每轮重新随机置换颜色并使用新鲜承诺随机数。'),
            d('挑战', T`e=(u,v)\xleftarrow{\$}E`, '挑战空间是边集合 E，不是一个抽象比特。'),
            d('验证', T`\operatorname{Open}(c_u,\hat\chi(u),r_u)=\operatorname{Open}(c_v,\hat\chi(v),r_v)=1\land\hat\chi(u)\neq\hat\chi(v)`, '单轮只能检查一条随机边。')
          ],
          rows: [
            r('承诺', 'Prover', 'Verifier', '发送所有顶点承诺 [[\\{c_v\\}_{v∈V}]]。', '[[G]]、[[\\{c_v\\}]]', '[[χ]]、[[π]]、所有 [[r_v]]', '每个承诺绑定本轮、顶点标识和置换颜色。'),
            r('抽查', 'Verifier', 'Prover', '均匀发送随机边 [[e=(u,v)∈E]]。', '[[e]]', '发出前随机币', '挑战来自 [[E]] 且与承诺后采样。'),
            r('打开', 'Prover', 'Verifier', '只发送端点 [[u,v]] 的颜色和打开随机数。', '两次 opening', '其余颜色/随机数、[[χ]]', '两个 opening 有效且颜色不同。'),
            r('重复', '双方', '彼此', '用全新置换和承诺独立重复 [[k]] 轮。', '所有 transcript', '[[χ]]、各轮随机数', 'soundness error 按具体图和重复方式下降。')
          ],
          sequence: [
            s('Prover(G,χ)', 'Verifier(G)', '{c_v=Com(π(χ(v));r_v)}_{v∈V}', 'π 和所有 r_v 每轮新鲜。'),
            s('Verifier(G)', 'Prover(G,χ)', '随机边 e=(u,v)∈E', '仅在承诺后抽样。'),
            s('Prover(G,χ)', 'Verifier(G)', '打开 c_u 与 c_v', '不打开其他顶点。'),
            s('Verifier(G)', 'Verifier(G)', '检查两个 opening 且颜色不同', '通过则本轮接受。')
          ]
        }
      ]
    },

    'sumcheck-protocol-notes.html': {
      intro: 'Sumcheck 逐轮把 m 元多项式的 Boolean hypercube 求和声明压缩为一个随机点求值声明。每轮 prover 发送一个单变量多项式，verifier 返回一个随机域元素。',
      specs: [{
        title: 'Sumcheck Protocol',
        note: '基础协议本身通常不隐藏多项式或 witness；零知识 Sumcheck 需要额外随机化/承诺机制。',
        definitions: [
          d('声明', T`H\stackrel{?}{=}\sum_{b\in\{0,1\}^{m}}f(b),\qquad f\in\mathbb F[X_1,\ldots,X_m],\ \deg_{X_i}f\le d`, 'f 的表示/求值访问方式必须明确。'),
          d('第 i 轮', T`g_i(T)=\sum_{b_{i+1},\ldots,b_m\in\{0,1\}}f(r_1,\ldots,r_{i-1},T,b_{i+1},\ldots,b_m)`, 'Prover 发送 deg g_i≤d 的系数/规范表示。'),
          d('一致性检查', T`g_1(0)+g_1(1)=H;\qquad g_i(0)+g_i(1)=g_{i-1}(r_{i-1})`, '检查通过后 verifier 才采样并发送 r_i。'),
          d('最终检查', T`g_m(r_m)\stackrel{?}{=}f(r_1,\ldots,r_m)`, 'Verifier 必须能独立求值 f(r) 或通过外层协议验证该求值。'),
          d('可靠性界', T`\Pr[\text{accept false claim}]\le\frac{md}{|\mathbb F|}`, '经典 Schwartz–Zippel/逐轮分析下的常用上界。')
        ],
        rows: [
          r('声明', 'Prover', 'Verifier', '发送/确认 [[H=\\sum_{b\\in\\{0,1\\}^m}f(b)]] 的声明。', '[[\\mathbb F]]、[[f]]/其承诺、[[H]]、[[m]]、[[d]]', '可选 witness', 'Verifier 固定 statement 和次数界。'),
          r('第 1 轮', 'Prover', 'Verifier', '发送单变量多项式 [[g_1(T)]]。', '[[g_1]]', '生成 [[g_1]] 的内部数据', '[[\\deg g_1≤d]] 且 [[g_1(0)+g_1(1)=H]]。'),
          r('挑战 1', 'Verifier', 'Prover', '检查后采样 [[r_1\\xleftarrow{\\$}\\mathbb F]] 并发送。', '[[r_1]]', '发出前随机币', '[[r_1]] 在看到 [[g_1]] 后均匀采样。'),
          r('第 i 轮', 'Prover', 'Verifier', '发送 [[g_i(T)]]，[[i=2,…,m]]。', '[[g_i]]、既有 [[r_j]]', '内部多项式数据', '[[\\deg g_i≤d]] 且 [[g_i(0)+g_i(1)=g_{i-1}(r_{i-1})]]。'),
          r('挑战 i', 'Verifier', 'Prover', '每轮检查后发送新鲜 [[r_i\\xleftarrow{\\$}\\mathbb F]]。', '[[r_i]]', '发出前随机币', '挑战独立且顺序不可提前。'),
          r('最终检查', 'Verifier 本地/外层 oracle', 'Verifier 本地', '比较 [[g_m(r_m)]] 与独立得到的 [[f(r_1,…,r_m)]]。', '完整 transcript、[[f(r)]]', '外层 witness（若有）', '两值相等且所有前序检查通过才接受。')
        ],
        sequence: [
          s('Prover', 'Verifier', 'H 与 g₁(T)', 'V 检查次数和 g₁(0)+g₁(1)=H。'),
          s('Verifier', 'Prover', 'r₁←$F', '必须在收到 g₁ 后采样。'),
          s('Prover', 'Verifier', 'g₂(T)', 'V 检查 g₂(0)+g₂(1)=g₁(r₁)。'),
          s('Verifier', 'Prover', 'r₂←$F', '继续交替到第 m 轮。'),
          s('Prover', 'Verifier', 'g_m(T)', '最后一个单变量多项式。'),
          s('Verifier', 'Prover', 'r_m←$F', '最终随机点完成。'),
          s('Verifier/外层求值机制', 'Verifier', 'f(r₁,…,r_m)', 'V 检查 g_m(r_m)=f(r)。')
        ]
      }]
    },

    'gkr-protocol-notes.html': {
      intro: 'GKR 验证分层算术电路：prover 持有执行轨迹，verifier 从输出层声明开始，逐层用 Sumcheck 把声明归约到输入层。',
      specs: [{
        title: 'GKR 分层电路验证协议',
        note: '下表采用 V_i 表示第 i 层门值表，Ṽ_i 表示其 MLE。层编号方向以文章约定为准；协议必须始终保持一致。',
        definitions: [
          d('关系', T`R_C=\{((C,x,y),W_C):W_C\text{ is a valid wire assignment},\ C(x)=y\}`, '公共 statement 是 (C,x,y)，W_C 是 prover 持有的完整执行轨迹。'),
          d('线路恒等式', T`\widetilde V_i(z)=\sum_{u,v\in\{0,1\}^{s_{i+1}}}\widetilde{\operatorname{add}}_i(z,u,v)(\widetilde V_{i+1}(u)+\widetilde V_{i+1}(v))+\widetilde{\operatorname{mult}}_i(z,u,v)\widetilde V_{i+1}(u)\widetilde V_{i+1}(v)`, 'wiring predicate 把门类型和两条输入线的索引关系代数化。'),
          d('Sumcheck 归约', T`\widetilde V_i(r_i)=F_i(\widetilde V_{i+1}(u),\widetilde V_{i+1}(v))\quad\Longrightarrow\quad\text{two claims on }\widetilde V_{i+1}`, 'Sumcheck 结束通常留下两个子层随机点求值声明。'),
          d('两点合一', T`\ell(t)=u+t(v-u),\quad h(t)=\widetilde V_{i+1}(\ell(t)),\quad h(0)=\widetilde V_{i+1}(u),\ h(1)=\widetilde V_{i+1}(v)`, 'Verifier 采样随机 α，把两项声明压成 h(α)=Ṽ_{i+1}(ℓ(α))。'),
          d('可靠性', T`\Pr[\text{accept }y\neq C(x)]\le\sum_i\varepsilon_i`, '每层误差由 Sumcheck 次数/域大小和线归约次数界共同控制；具体常数取决于电路编码。')
        ],
        rows: [
          r('轨迹生成', 'Prover 本地', 'Prover 本地', '执行 [[C(x)]]，得到各层 [[V_i]] 与 witness trace [[W_C]]。', '[[C]]、[[x]]、声明 [[y]]', '[[W_C]]、内部层值', '每个门值按 [[C]] 的域运算正确。'),
          r('输出声明', 'Prover', 'Verifier', '发送/确认输出层值或声明 [[\\widetilde V_0(r_0)=v_0]]。', '[[C]]、[[x]]、[[y]]、[[r_0]]、[[v_0]]', '[[W_C]]', '[[v_0]] 与公开输出编码一致；[[r_0]] 按协议采样。'),
          r('层 i Sumcheck', 'Prover', 'Verifier', '逐轮发送单变量多项式 [[g_{i,j}]]。', '当前层声明、[[g_{i,j}]]', '[[V_i,V_{i+1}]]', '次数界及每轮 [[g(0)+g(1)]] 等于前一声明。'),
          r('层 i 挑战', 'Verifier', 'Prover', '每轮在收到 [[g_{i,j}]] 后发送新鲜随机 [[r_{i,j}∈\\mathbb F]]。', '挑战 [[r_{i,j}]]', '发出前随机币', '挑战顺序和均匀性正确。'),
          r('子层两项', 'Prover', 'Verifier', '发送 [[\\widetilde V_{i+1}(u)]]、[[\\widetilde V_{i+1}(v)]] 以完成 wiring identity 检查。', '[[u,v]] 与两个声称值', '完整 [[V_{i+1}]]', '代入 add/mult wiring MLE 后等式成立。'),
          r('线归约', 'Verifier', 'Prover', '发送随机 [[α]]；下一层声明点变为 [[ℓ(α)]]，值为 [[h(α)]]。', '[[α]]、[[ℓ(α)]]、[[h(α)]]', '[[V_{i+1}]]', '[[h]] 低度且同时通过 [[t=0,1]] 两端点约束。'),
          r('输入层终检', 'Verifier 本地', 'Verifier 本地', '独立由公开 [[x]] 计算 [[\\widetilde V_d(r_d)]]，与最终声明比较。', '[[x]]、[[r_d]]、最终声称值', '无（若输入公开）', '相等且所有层检查通过才接受。')
        ],
        sequence: [
          s('Prover(C,x,W_C)', 'Verifier(C,x,y)', '输出层声明 Ṽ₀(r₀)=v₀', '由公开 y 初始化。'),
          s('Prover', 'Verifier', '层 i 的 g_{i,1}(T)', 'V 检查次数与求和一致性。'),
          s('Verifier', 'Prover', 'r_{i,1}←$F', '收到多项式后才采样。'),
          s('P ↔ V', 'P ↔ V', '继续该层 Sumcheck', '直到固定 u,v。'),
          s('Prover', 'Verifier', 'Ṽ_{i+1}(u), Ṽ_{i+1}(v)', '用于核对 wiring identity。'),
          s('Verifier', 'Prover', 'α←$F', '形成 ℓ(α) 上的单个下一层声明。'),
          s('P ↔ V', 'P ↔ V', '对 i+1 层重复', '逐层归约。'),
          s('Verifier', 'Verifier', '由公开 x 计算输入层 MLE', '与最终声明相等则接受。')
        ]
      }]
    },

    'kzg-polynomial-commitment.html': {
      intro: 'KZG 把单变量低度多项式承诺为一个群元素，并用一个群元素证明某点求值。Setup 的秘密 τ 必须未知或被销毁。',
      specs: [{
        title: 'KZG Polynomial Commitment',
        note: '本文的 KZG 是单变量 PCS。若上层对象是 MLE，必须说明采用何种兼容承诺或如何把多线性对象转换为单变量对象。',
        definitions: [
          d('Setup', T`\tau\xleftarrow{\$}\mathbb F^*;\quad pp=(g_1,g_1^{\tau},\ldots,g_1^{\tau^d},g_2,g_2^{\tau})`, 'τ 是 toxic waste；公开 SRS 只包含其幂的群编码。'),
          d('Commit', T`f(X)=\sum_{i=0}^{d}f_iX^i;\qquad C_f=\prod_{i=0}^{d}(g_1^{\tau^i})^{f_i}=g_1^{f(\tau)}`, '承诺不应通过直接知道 τ 计算。基础 KZG 是确定性承诺，不自动隐藏 f。'),
          d('Open', T`y=f(z);\quad q(X)=\frac{f(X)-y}{X-z};\quad \pi_z=g_1^{q(\tau)}`, '整除成立是因为 y=f(z)。'),
          d('Verify', T`e(C_f/g_1^y,g_2)\stackrel{?}{=}e(\pi_z,g_2^{\tau}/g_2^z)`, '等价于检查 f(τ)−y=q(τ)(τ−z)。'),
          d('安全边界', T`\text{evaluation binding under an appropriate }q\text{-SDH-type assumption}`, '知识可靠性、隐藏性和多项式提取是额外性质/变体，不能由一个 pairing 等式直接宣称。')
        ],
        rows: [
          r('Setup', '仪式参与者/参数生成方', '所有 Prover 与 Verifier', '生成 SRS [[pp]]，并确保至少一个贡献者销毁其秘密使最终 [[τ]] 未知。', '[[pp]]、仪式 transcript', '各贡献秘密/最终 [[τ]]', 'SRS 幂次和群成员正确；toxic waste 不被任何对手掌握。'),
          r('Commit', 'Prover 本地', 'Prover 本地', '检查 [[\\deg f≤d]]，使用 SRS 计算 [[C_f=g_1^{f(τ)}]]。', '[[pp]]、[[d]]；[[C_f]] 生成后公开', '[[f]]', '[[C_f]] 绑定到固定域、基和次数界。'),
          r('发送承诺', 'Prover', 'Verifier', '发送 [[C_f]] 及 statement/context。', '[[C_f]]、context', '[[f]]', '承诺与具体协议、对象标识和会话绑定。'),
          r('查询', 'Verifier', 'Prover', '发送/确定查询点 [[z∈\\mathbb F]]。', '[[z]]', '发出前随机币（若随机）', '[[z]] 在承诺固定后采样，除非协议另有证明。'),
          r('Open', 'Prover', 'Verifier', '计算 [[y=f(z)]]、[[q=(f-y)/(X-z)]]，发送 [[(y,π_z=g_1^{q(τ)})]]。', '[[z]]、[[y]]、[[π_z]]', '[[f]]、[[q]]', '[[q]] 是多项式且次数在 SRS 支持范围内。'),
          r('Verify', 'Verifier 本地', 'Verifier 本地', '检查群元素并执行 pairing 等式。', '[[pp]]、[[C_f]]、[[z]]、[[y]]、[[π_z]]', '无', '群/子群/编码检查与 pairing 等式全部通过。')
        ],
        sequence: [
          s('Setup 仪式', 'Prover/Verifier', 'SRS pp', '最终 τ 必须未知。'),
          s('Prover(f)', 'Verifier', 'C_f=g₁^{f(τ)}', 'f 可保持在 prover 侧，但基础 KZG 非 hiding。'),
          s('Verifier', 'Prover(f)', '查询点 z', '通常在 C_f 固定后选择。'),
          s('Prover(f)', 'Verifier', 'y=f(z), π_z=g₁^{q(τ)}', 'q=(f−y)/(X−z)。'),
          s('Verifier', 'Verifier', 'pairing 验证等式', '通过则接受求值声明。')
        ]
      }]
    },

  };

  window.FORMAL_PROTOCOLS = pages;
})();
