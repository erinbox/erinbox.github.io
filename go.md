# Rules of Go

Let $(T, \leftrightarrow)$ be the **board graph**, typically defined as

$$
T = \{ (i,j) \in \N^2 \mid 1 \leq i,j \leq 19 \}
$$

and

$$
(i_1,j_1)\leftrightarrow(i_2,j_2)\iff |i_2-i_1|+|j_2-j_1|=1\text{.}
$$

Define

$$
C = \{B,W\}
$$

$$
c_\text{opp} = \begin{cases}
W&c=B\\
B&c=W
\end{cases}
$$

$$
X_\bullet = X \cup \{\bullet\}
$$

Define a **game state** as a triple $s = (b,c,p)$ where

- $b : T \to C_{\bullet}$ is the **board function**;
- $c\in C$ is the **current player**;
- $p\in \N$ is the number of consecutive passes.

Let $S$ be the set of game states. Define the move function $\mu: S \times T_\bullet \to S_\bullet$ as

$$
\mu((b,c,p),t)=\begin{cases}
(b,c_\text{opp},p+1)&t=\bullet\\
\bullet&t\neq\bullet \land b(t)=\bullet\\
(b'',c_\text{opp},0)&t\neq\bullet \land b(t)\neq\bullet\\
\end{cases}
$$

where

$$
b'(u)=\begin{cases}
c&u=t\\
b(t)&u\neq t
\end{cases}
$$

$$
b'' = \chi(\chi(b',c_\text{opp}),c)
$$

$$
\chi(b,c)(t)=\begin{cases}
b(t)&\operatorname{reaches}(b,t,\bullet)\\
\bullet&\lnot\operatorname{reaches}(b,t,\bullet)
\end{cases}
$$

$$
\operatorname{reaches}(b,t,c)\iff \exists t_1\leftrightarrow \cdots\leftrightarrow t_n.\\t=t_1\land \forall i < n.\,b(t_i)=b(t)\land b(t_n)=c
$$

Define the **score** function $\varphi:(T\to C_\bullet)\times C \to \N$ as

$$
\varphi(b,c) = |\{t \in T \mid b(t) =c \lor\\
b(t)=\bullet \land \operatorname{reaches}(b,t,c)\land \lnot\operatorname{reaches}(b,t,c_\text{opp})\}|
$$


## Games

A **game** is a finite sequence of moves $G = (m_0,\ldots,m_{n-1})$ such that there exist game states $(b_0,c_0,p_0),\ldots,(b_n,c_n,p_n)$  (necessarily unique) satisfying

- $b_0(t)=\bullet$;
- $c_0=B$;
- $p_0=0$;
- $p_n=2$;

and for $0\leq i < N$,

- $\mu((b_i,c_i,p_i),m_i)=(b_{i+1},c_{i+1},p_{i+1})$;
- $m_i \neq \bullet \implies \forall 0\leq j \leq i,\,b_j \neq b_{i+1}$;
- $p_i < 2$.

The winner $w\in C_\bullet$ (where $\bullet$ encodes a tie) is defined as

$$
w(G) = \begin{cases}
B&\varphi(b_n,B)>\varphi(b_n,W)\\
\bullet&\varphi(b_n,B)=\varphi(b_n,W)\\
W&\varphi(b_n,B)<\varphi(b_n,W)
\end{cases}
$$